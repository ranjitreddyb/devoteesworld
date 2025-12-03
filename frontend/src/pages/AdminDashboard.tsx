import { useEffect, useState } from 'react';
import { storage } from '../services/storage-service';
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
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
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
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await apiService.get('/events');
      setEvents(response.data || []);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const eventData = {
        ...formData,
        poojas: [{ name: formData.title, durationMinutes: 120, significance: formData.description, price: parseInt(formData.price) }],
      };
      await apiService.post('/events', eventData);
      toast.success('✅ Event created successfully!');
      setFormData({ title: '', description: '', startDate: '', endDate: '', venue: '', status: 'future', price: '' });
      setShowAddForm(false);
      fetchEvents();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create event');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await apiService.delete(`/events/${id}`);
      toast.success('✅ Event deleted!');
      fetchEvents();
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

        for (const event of uploadEvents) {
          await apiService.post('/events', event);
        }
        toast.success(`✅ ${uploadEvents.length} events uploaded!`);
        fetchEvents();
      } catch (error: any) {
        toast.error('CSV upload failed');
      }
    };
    reader.readAsText(file);
  };

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
                onClick={() => setShowAddForm(!showAddForm)}
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

            {/* Add Event Form */}
            {showAddForm && (
              <form onSubmit={handleAddEvent} style={{ background: 'rgb(249, 250, 251)', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Event Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{ padding: '0.75rem', border: '1px solid rgb(229, 231, 235)', borderRadius: '0.5rem' }}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{ padding: '0.75rem', border: '1px solid rgb(229, 231, 235)', borderRadius: '0.5rem' }}
                  />
                  <input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    style={{ padding: '0.75rem', border: '1px solid rgb(229, 231, 235)', borderRadius: '0.5rem' }}
                    required
                  />
                  <input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    style={{ padding: '0.75rem', border: '1px solid rgb(229, 231, 235)', borderRadius: '0.5rem' }}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Venue"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    style={{ padding: '0.75rem', border: '1px solid rgb(229, 231, 235)', borderRadius: '0.5rem' }}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price (₹)"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={{ padding: '0.75rem', border: '1px solid rgb(229, 231, 235)', borderRadius: '0.5rem' }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1.5rem',
                    background: 'rgb(34, 197, 94)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  ✅ Create Event
                </button>
              </form>
            )}

            {/* Events List */}
            <div style={{ display: 'grid', gap: '1rem' }}>
              {events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event._id}
                    style={{
                      padding: '1.5rem',
                      background: 'rgb(249, 250, 251)',
                      borderRadius: '0.75rem',
                      border: '1px solid rgb(229, 231, 235)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: '600' }}>{event.title}</h3>
                      <p style={{ margin: 0, color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>
                        📍 {event.venue} | 🕐 {new Date(event.startDate).toLocaleDateString()} | ₹{event.poojas?.[0]?.price || 0}
                      </p>
                    </div>
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
            <p style={{ color: 'rgb(107, 114, 128)', marginBottom: '1.5rem' }}>
              Upload multiple events at once using CSV format. Download the template first!
            </p>

            <button
              onClick={downloadCSVTemplate}
              style={{
                marginBottom: '1.5rem',
                padding: '0.75rem 1.5rem',
                background: 'rgb(59, 130, 246)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              📥 Download Template
            </button>

            <div
              style={{
                padding: '2rem',
                background: 'rgb(249, 250, 251)',
                border: '2px dashed rgb(229, 231, 235)',
                borderRadius: '1rem',
                textAlign: 'center',
              }}
            >
              <input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                style={{ display: 'none' }}
                id="csvInput"
              />
              <label
                htmlFor="csvInput"
                style={{
                  cursor: 'pointer',
                  display: 'block',
                  padding: '1rem',
                }}
              >
                <p style={{ fontSize: '1.125rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>📁 Drop CSV or click to upload</p>
                <p style={{ color: 'rgb(107, 114, 128)', margin: 0, fontSize: '0.875rem' }}>Accepted: .csv files</p>
              </label>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>📊 Analytics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1.5rem', background: 'rgb(249, 250, 251)', borderRadius: '0.75rem', textAlign: 'center' }}>
                <p style={{ color: 'rgb(107, 114, 128)', margin: '0 0 0.5rem 0' }}>Total Events</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{events.length}</p>
              </div>
              <div style={{ padding: '1.5rem', background: 'rgb(249, 250, 251)', borderRadius: '0.75rem', textAlign: 'center' }}>
                <p style={{ color: 'rgb(107, 114, 128)', margin: '0 0 0.5rem 0' }}>Future Events</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{events.filter(e => e.status === 'future').length}</p>
              </div>
              <div style={{ padding: '1.5rem', background: 'rgb(249, 250, 251)', borderRadius: '0.75rem', textAlign: 'center' }}>
                <p style={{ color: 'rgb(107, 114, 128)', margin: '0 0 0.5rem 0' }}>Total Revenue (₹)</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
                  {events.reduce((sum, e) => sum + (e.poojas?.[0]?.price || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
