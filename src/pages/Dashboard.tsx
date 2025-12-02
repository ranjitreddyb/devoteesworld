import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface Booking {
  id: number;
  eventTitle: string;
  pooja: string;
  date: string;
  venue: string;
  status: string;
  amount: number;
}

interface UpcomingEvent {
  id: number;
  title: string;
  date: string;
  venue: string;
  status: string;
}

export default function Dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Fetch user bookings and events
    const fetchData = async () => {
      try {
        // Fetch bookings (mock for now)
        setBookings([
          {
            id: 1,
            eventTitle: 'Sunday Surya Puja',
            pooja: 'Surya Puja',
            date: '2025-12-07',
            venue: 'Main Temple',
            status: 'confirmed',
            amount: 500,
          },
          {
            id: 2,
            eventTitle: 'Monthly Hanuman Chalisa',
            pooja: 'Hanuman Chalisa',
            date: '2025-12-14',
            venue: 'Meditation Hall',
            status: 'pending',
            amount: 300,
          },
        ]);

        // Fetch upcoming events
        setUpcomingEvents([
          {
            id: 1,
            title: 'Maghamaasam Festival',
            date: '2025-12-20',
            venue: 'Main Temple',
            status: 'upcoming',
          },
          {
            id: 2,
            title: 'New Moon Puja',
            date: '2025-12-25',
            venue: 'Meditation Hall',
            status: 'upcoming',
          },
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Please login to view your dashboard</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}!</h1>
        <p className="text-gray-600">Manage your bookings and explore upcoming events</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'profile'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'bookings'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          My Bookings
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'events'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          Upcoming Events
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <>
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-600">Full Name</label>
                  <p className="text-lg font-semibold">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="text-lg font-semibold">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone Number</label>
                  <p className="text-lg font-semibold">{user.phoneNumber || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Role</label>
                  <p className="text-lg font-semibold capitalize">{user.role || 'user'}</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/events')}
                className="mt-6 px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                Browse Events
              </button>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
              {bookings.length === 0 ? (
                <p className="text-gray-600">No bookings yet. <button onClick={() => navigate('/events')} className="text-orange-600 hover:underline">Browse events</button> to make your first booking!</p>
              ) : (
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{booking.eventTitle}</h3>
                          <p className="text-gray-600">🕉️ {booking.pooja}</p>
                          <p className="text-sm text-gray-500">📅 {new Date(booking.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-500">📍 {booking.venue}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status.toUpperCase()}
                          </span>
                          <p className="text-lg font-bold text-orange-600 mt-2">₹{booking.amount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
              {upcomingEvents.length === 0 ? (
                <p className="text-gray-600">No upcoming events</p>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                          <p className="text-sm text-gray-500">📅 {new Date(event.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-500">📍 {event.venue}</p>
                        </div>
                        <button
                          onClick={() => navigate(`/events/1`)}
                          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
