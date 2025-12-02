import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface Event {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  venue: string;
  poojas: any[];
  attendees: number;
}

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">🕉️ Welcome to DevoteeWorld</h1>
        <p className="text-xl text-gray-600 mb-8">
          Experience sacred Hindu rituals, poojas, and spiritual events
        </p>
        <button
          onClick={() => navigate('/events')}
          className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
        >
          Explore Events
        </button>
      </div>

      {/* Events Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Events</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-600">No events available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <div key={event._id} className="bg-white shadow rounded-lg hover:shadow-lg transition overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">🕉️ {event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>📅 {new Date(event.startDate).toLocaleDateString()}</p>
                    <p>📍 {event.venue}</p>
                    <p>🕉️ {event.poojas?.length || 0} Poojas</p>
                    <p>👥 {event.attendees || 0} Attendees</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/events/${event._id}`)}
                      className="flex-1 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 font-semibold"
                    >
                      View Details
                    </button>
                    {isAuthenticated ? (
                      <button
                        onClick={() => navigate(`/events/${event._id}`)}
                        className="flex-1 px-4 py-2 border-2 border-orange-600 text-orange-600 rounded hover:bg-orange-50 font-semibold"
                      >
                        Book Now
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate('/login')}
                        className="flex-1 px-4 py-2 border-2 border-orange-600 text-orange-600 rounded hover:bg-orange-50 font-semibold"
                      >
                        Login
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-orange-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose DevoteeWorld?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🕉️</div>
              <h3 className="text-xl font-bold mb-2">Sacred Rituals</h3>
              <p className="text-gray-600">Authentic Hindu poojas and rituals</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Simple and secure payment process</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-2">Spiritual Growth</h3>
              <p className="text-gray-600">Connect with your inner self</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
