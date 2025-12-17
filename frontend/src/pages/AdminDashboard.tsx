import { useEffect, useState } from 'react';
import apiService from '../services/api';
import toast from 'react-hot-toast';

interface Event {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  status: string;
  poojas: any[];
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'events' | 'upload' | 'analytics'>('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    venue: '',
    status: 'future',
    price: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, bookingsRes] = await Promise.all([
        apiService.get('/v1/events'),
        apiService.get('/v1/bookings'),
      ]);

      setEvents(eventsRes.data || []);
      setBookings(bookingsRes.data || []);
    } catch (error: any) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        venue: formData.venue,
        status: formData.status,
        poojas: [{
          name: formData.title,
          durationMinutes: 120,
          significance: formData.description,
          price: parseInt(formData.price)
        }],
      };

      if (editingEvent) {
        await apiService.put(`/v1/events/${editingEvent._id}`, eventData);
        toast.success('✅ Event updated!');
        setEditingEvent(null);
      } else {
        await apiService.post('/v1/events', eventData);
        toast.success('✅ Event created!');
      }

      setFormData({ title: '', description: '', startDate: '', endDate: '', venue: '', status: 'future', price: '' });
      setShowAddForm(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save event');
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      startDate: event.startDate.slice(0, 16),
      endDate: event.endDate.slice(0, 16),
      venue: event.venue,
      status: event.status,
      price: event.poojas?.[0]?.price?.toString() || '',
    });
    setShowAddForm(true);
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await apiService.delete(`/v1/events/${id}`);
      toast.success('✅ Event deleted!');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  const downloadCSVTemplate = () => {
    const headers = ['Event Name', 'Description', 'Start Date (YYYY-MM-DD)', 'Venue', 'Status (future/ongoing/completed)', 'Price (₹)'];
    const csv = headers.join(',') + '\n' + 'Example Pooja,Description,2025-12-07,Main Temple,future,500\n';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'event_template.csv';
    a.click();
  };

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const csv = event.target?.result as string;
        const lines = csv.split('\n').slice(1);
        const uploadEvents = lines
          .filter(line => line.trim())
          .map(line => {
            const [title, description, startDate, venue, status, price] = line.split(',').map(s => s.trim());
            return {
              title,
              description,
              startDate: new Date(startDate).toISOString(),
              endDate: new Date(new Date(startDate).getTime() + 2 * 60 * 60 * 1000).toISOString(),
              venue,
              status,
              poojas: [{ name: title, durationMinutes: 120, significance: description, price: parseInt(price) }],
            };
          });

        for (const uploadEvent of uploadEvents) {
          await apiService.post('/v1/events', uploadEvent);
        }
        toast.success(`✅ ${uploadEvents.length} events uploaded!`);
        fetchData();
      } catch (error: any) {
        toast.error('CSV upload failed');
      }
    };
    reader.readAsText(file);
  };

  const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);
  const totalBookings = bookings.length;

  // Analytics data
  const poojaAnalytics = {} as any;

  bookings.forEach((booking: any) => {
    booking.poojas?.forEach((pooja: string) => {
      poojaAnalytics[pooja] = (poojaAnalytics[pooja] || 0) + 1;
    });
  });

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>⏳ Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'rgb(245, 245, 245)' }}>
      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', marginBottom: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>⚙️ Admin Dashboard</h1>
          <p style={{ color: 'rgb(107, 114, 128)' }}>Manage events, upload CSV, and view analytics</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid rgb(229, 231, 235)' }}>
          {['events', 'upload', 'analytics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeTab === tab ? 'linear-gradient(to right, rgb(249, 115, 22), rgb(147, 51, 234))' : 'transparent',
                color: activeTab === tab ? 'white' : 'rgb(107, 114, 128)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                borderRadius: '0.5rem 0.5rem 0 0',
              }}
            >
              {tab === 'events' && '📅 Events'}
              {tab === 'upload' && '📤 CSV Upload'}
              {tab === 'analytics' && '📊 Analytics'}
            </button>
          ))}
        </div>

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>📅 Event Management ({events.length})</h2>
              <button
                onClick={() => {
                  if (showAddForm) {
                    setEditingEvent(null);
                    setFormData({ title: '', description: '', startDate: '', endDate: '', venue: '', status: 'future', price: '' });
                  }
                  setShowAddForm(!showAddForm);
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(to right, rgb(249, 115, 22), rgb(147, 51, 234))',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                {showAddForm ? '✕ Cancel' : '+ Add Event'}
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddEvent} style={{ background: 'rgb(249, 250, 251)', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
                <h3>{editingEvent ? '✏️ Edit Event' : '➕ Add New Event'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  <input type="text" placeholder="Event Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ padding: '0.75rem', border: '1px solid rgb(229, 231, 235)', borderRadius: '0.5rem' }} required />
                  <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ padding: '0.75rem', border: '1px solid rgb(229, 231, 235)', borderRadius: '0.5rem' }} />
                  <input type="datetime-local" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} style={{ padding: '0.75rem', border: '1px solid rgb(229, 231, 235)', borderRadius: '0.5rem' }} required />
                  <input type="datetime-local" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} style={{ padding: '0.75rem', border: '1px solid rgb(229, 231, 235)', borderRadius: '0.5rem' }} required />
                  <input type="text" placeholder="Venue" value={formData.venue} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} style={{ padding: '0.75rem', border: '1px solid rgb(229, 231, 235)', borderRadius: '0.5rem' }} required />
                  <input type="number" placeholder="Price (₹)" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} style={{ padding: '0.75rem', border: '1px solid rgb(229, 231, 235)', borderRadius: '0.5rem' }} required />
                </div>
                <button type="submit" style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', background: 'rgb(34, 197, 94)', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '600' }}>
                  {editingEvent ? '✏️ Update Event' : '✅ Create Event'}
                </button>
              </form>
            )}

            <div style={{ display: 'grid', gap: '1rem' }}>
              {events.length > 0 ? (
                events.map((event) => (
                  <div key={event._id} style={{ padding: '1.5rem', background: 'rgb(249, 250, 251)', borderRadius: '0.75rem', border: '1px solid rgb(229, 231, 235)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: '600' }}>{event.title}</h3>
                      <p style={{ margin: 0, color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>
                        📍 {event.venue} | 🕐 {new Date(event.startDate).toLocaleDateString()} | ₹{event.poojas?.[0]?.price || 0}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleEditEvent(event)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'rgb(59, 130, 246)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'rgb(239, 68, 68)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', color: 'rgb(107, 114, 128)' }}>No events yet. Create one or upload CSV!</p>
              )}
            </div>
          </div>
        )}

        {/* CSV Upload Tab */}
        {activeTab === 'upload' && (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>📤 Bulk CSV Upload</h2>
            <button onClick={downloadCSVTemplate} style={{ marginBottom: '1.5rem', padding: '0.75rem 1.5rem', background: 'rgb(59, 130, 246)', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '600' }}>
              📥 Download Template
            </button>
            <div style={{ padding: '2rem', background: 'rgb(249, 250, 251)', border: '2px dashed rgb(229, 231, 235)', borderRadius: '1rem', textAlign: 'center' }}>
              <input type="file" accept=".csv" onChange={handleCSVUpload} style={{ display: 'none' }} id="csvInput" />
              <label htmlFor="csvInput" style={{ cursor: 'pointer', display: 'block', padding: '1rem' }}>
                <p style={{ fontSize: '1.125rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>📁 Drop CSV or click to upload</p>
              </label>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>📊 Analytics</h2>
            
            {/* Key Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.5rem', background: 'rgb(249, 250, 251)', borderRadius: '0.75rem', textAlign: 'center' }}>
                <p style={{ color: 'rgb(107, 114, 128)', margin: '0 0 0.5rem 0' }}>Total Events</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{events.length}</p>
              </div>
              <div style={{ padding: '1.5rem', background: 'rgb(249, 250, 251)', borderRadius: '0.75rem', textAlign: 'center' }}>
                <p style={{ color: 'rgb(107, 114, 128)', margin: '0 0 0.5rem 0' }}>Total Bookings</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{totalBookings}</p>
              </div>
              <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgb(34, 197, 94), rgb(16, 185, 129))', borderRadius: '0.75rem', textAlign: 'center', color: 'white' }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>Total Revenue (₹)</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>₹{totalRevenue}</p>
              </div>
            </div>

            {/* Booking Details Table */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>📋 Booking Details</h3>
              {bookings.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'rgb(249, 250, 251)', borderBottom: '2px solid rgb(229, 231, 235)' }}>
                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Booking ID</th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>User</th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Event</th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Poojas</th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Amount</th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking._id} style={{ borderBottom: '1px solid rgb(229, 231, 235)' }}>
                          <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{booking._id.slice(-8)}</td>
                          <td style={{ padding: '1rem' }}>{booking.userId?.name || 'Unknown'}</td>
                          <td style={{ padding: '1rem' }}>{booking.eventId?.title || 'Unknown'}</td>
                          <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{booking.poojas?.join(', ') || '-'}</td>
                          <td style={{ padding: '1rem', fontWeight: '600' }}>₹{booking.amount}</td>
                          <td style={{ padding: '1rem' }}>
                            <span style={{ background: 'rgb(240, 253, 244)', color: 'rgb(34, 197, 94)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem' }}>
                              {booking.status || 'Confirmed'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ color: 'rgb(107, 114, 128)' }}>No bookings yet</p>
              )}
            </div>

            {/* Pooja-wise Analytics */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>🕉️ Pooja-wise Bookings</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                {Object.entries(poojaAnalytics).map(([pooja, count]: [string, any]) => (
                  <div key={pooja} style={{ padding: '1rem', background: 'rgb(249, 250, 251)', borderRadius: '0.75rem', textAlign: 'center' }}>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>{pooja}</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{count}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Event-wise Analytics */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>📅 Event-wise Attendees</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {events.map((event) => {
                  const attendees = bookings.filter(b => b.eventId?._id === event._id).length;
                  return (
                    <div key={event._id} style={{ padding: '1rem', background: 'rgb(249, 250, 251)', borderRadius: '0.75rem' }}>
                      <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>{event.title}</p>
                      <p style={{ margin: 0, color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>👥 {attendees} attendees</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
