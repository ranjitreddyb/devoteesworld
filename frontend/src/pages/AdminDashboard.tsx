import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import apiService from '../services/api';
import { storage } from '../services/storage-service';

interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  price: number;
  status: string;
  maxAttendees: number;
}

interface Booking {
  id: string;
  eventName: string;
  userName: string;
  attendees: number;
  amount: number;
  status: string;
  date?: string;
}

interface Analytics {
  totalEvents: number;
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  upcomingEvents?: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('analytics');
  
  // State for analytics
  const [analytics, setAnalytics] = useState<Analytics>({
    totalEvents: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalUsers: 0,
  });

  // State for events
  const [events, setEvents] = useState<Event[]>([]);

  // State for bookings
  const [bookings, setBookings] = useState<Booking[]>([]);

  // State for adding event
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    endDate: '',
    venue: '',
    city: '',
    price: 0,
    maxAttendees: 0,
    poojaName: '',
    description: '',
    status: 'upcoming',
  });

  // Check if user is admin on component mount
  useEffect(() => {
    const user = storage.getUser();
    
    if (!user || user.role !== 'admin') {
      toast.error('Access denied. Admin only.');
      navigate('/');
      return;
    }

    loadAdminData();
  }, [navigate]);

  // Load all admin data
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, eventsRes, bookingsRes] = await Promise.all([
        apiService.getAdminAnalytics(),
        apiService.getAdminEvents(),
        apiService.getAdminBookings(),
      ]);

      setAnalytics(analyticsRes.data);
      setEvents(eventsRes.data || []);
      setBookings(bookingsRes.data || []);
    } catch (error: any) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  // Handle add event
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEvent.name || !newEvent.date || !newEvent.venue) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      await apiService.createEvent(newEvent);
      toast.success('Event created successfully!');
      setShowAddEvent(false);
      setNewEvent({
        name: '',
        date: '',
        endDate: '',
        venue: '',
        city: '',
        price: 0,
        maxAttendees: 0,
        poojaName: '',
        description: '',
        status: 'upcoming',
      });
      loadAdminData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create event');
    }
  };

  // Handle delete event
  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await apiService.deleteEvent(id);
      toast.success('Event deleted successfully!');
      loadAdminData();
    } catch (error: any) {
      toast.error('Failed to delete event');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">🏛️ Admin Dashboard</h1>
          <p className="text-purple-100">Manage events, bookings, and view analytics</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-3 font-semibold transition ${
              activeTab === 'analytics'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📊 Analytics
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-3 font-semibold transition ${
              activeTab === 'events'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📅 Events
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-3 font-semibold transition ${
              activeTab === 'bookings'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📋 Bookings
          </button>
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Analytics Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Events', value: analytics.totalEvents, icon: '📅' },
                { label: 'Total Bookings', value: analytics.totalBookings, icon: '📋' },
                { label: 'Total Revenue', value: `₹${analytics.totalRevenue?.toLocaleString()}`, icon: '💰' },
                { label: 'Total Users', value: analytics.totalUsers, icon: '👥' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-purple-600">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Additional stats */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded border-l-4 border-blue-500">
                  <p className="text-sm text-gray-600">Upcoming Events</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {analytics.upcomingEvents || 0}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded border-l-4 border-green-500">
                  <p className="text-sm text-gray-600">Avg Booking Value</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{analytics.totalBookings > 0 
                      ? Math.round(analytics.totalRevenue / analytics.totalBookings)
                      : 0}
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded border-l-4 border-orange-500">
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {analytics.totalUsers > 0
                      ? Math.round((analytics.totalBookings / analytics.totalUsers) * 100)
                      : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Events</h2>
              <button
                onClick={() => setShowAddEvent(!showAddEvent)}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 font-semibold"
              >
                {showAddEvent ? '❌ Cancel' : '➕ Add Event'}
              </button>
            </div>

            {/* Add Event Form */}
            {showAddEvent && (
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-semibold mb-4">Create New Event</h3>
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Event Name"
                      value={newEvent.name}
                      onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                      className="px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Pooja Name"
                      value={newEvent.poojaName}
                      onChange={(e) => setNewEvent({ ...newEvent, poojaName: e.target.value })}
                      className="px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                      required
                    />
                    <input
                      type="date"
                      value={newEvent.endDate}
                      onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                      className="px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Venue"
                      value={newEvent.venue}
                      onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                      className="px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                      required
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={newEvent.city}
                      onChange={(e) => setNewEvent({ ...newEvent, city: e.target.value })}
                      className="px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Price (₹)"
                      value={newEvent.price}
                      onChange={(e) => setNewEvent({ ...newEvent, price: Number(e.target.value) })}
                      className="px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                    />
                    <input
                      type="number"
                      placeholder="Max Attendees"
                      value={newEvent.maxAttendees}
                      onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: Number(e.target.value) })}
                      className="px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <textarea
                    placeholder="Description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600 min-h-[80px]"
                  />

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 font-semibold"
                    >
                      Create Event
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Events List */}
            {events.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Event Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Venue</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Max Attendees</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-semibold">{event.name}</span>
                        </td>
                        <td className="px-6 py-4">{new Date(event.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{event.venue}</td>
                        <td className="px-6 py-4">₹{event.price}</td>
                        <td className="px-6 py-4">{event.maxAttendees}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              event.status === 'upcoming'
                                ? 'bg-blue-100 text-blue-800'
                                : event.status === 'ongoing'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={() => toast('Edit functionality coming soon', { icon: 'ℹ️' })}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-gray-600 text-lg">No events found. Create your first event!</p>
              </div>
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Manage Bookings</h2>

            {bookings.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Booking ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Event</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">User</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Attendees</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-sm">#{booking.id}</td>
                        <td className="px-6 py-4">{booking.eventName}</td>
                        <td className="px-6 py-4">{booking.userName}</td>
                        <td className="px-6 py-4">{booking.attendees}</td>
                        <td className="px-6 py-4">₹{booking.amount?.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-gray-600 text-lg">No bookings found yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}