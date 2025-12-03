import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

interface Pooja {
  name: string;
  price: number;
  durationMinutes: number;
  significance?: string;
}

interface Event {
  _id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  venue: string;
  status: string;
  poojas: Pooja[];
}

export default function Events() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'featured' | 'today'>('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilter(filter);
  }, [events, filter]);

  const fetchEvents = async () => {
    try {
      console.log('📥 Fetching events from /api/v1/events');
      const response = await fetch('http://localhost:3000/api/v1/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      console.log('✅ Events fetched:', data);
      setEvents(data || []);
      setLoading(false);
    } catch (error) {
      console.error('❌ Failed to fetch events:', error);
      toast.error('Failed to load events');
      setLoading(false);
    }
  };

  const applyFilter = (filterType: string) => {
    let filtered = events;

    switch (filterType) {
      case 'upcoming':
        filtered = events.filter(e => e.status === 'future');
        break;
      case 'today':
        const today = new Date().toDateString();
        filtered = events.filter(
          e => new Date(e.startDate).toDateString() === today
        );
        break;
      case 'featured':
        filtered = events.slice(0, 5);
        break;
      default:
        filtered = events;
    }

    setFilteredEvents(filtered);
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', minHeight: '60vh' }}>
        <p>⏳ Loading events...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgb(147, 51, 234), rgb(249, 115, 22))' }}>
      {/* Hero Section */}
      <div style={{ padding: '4rem 2rem', color: 'white', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>
          🏛️ Events & Poojas
        </h1>
        <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>
          Discover upcoming spiritual services and ceremonies
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {['all', 'upcoming', 'featured', 'today'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              style={{
                padding: '0.75rem 1.5rem',
                background: filter === f ? 'white' : 'rgba(255, 255, 255, 0.2)',
                color: filter === f ? 'rgb(147, 51, 234)' : 'white',
                border: 'none',
                borderRadius: '2rem',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s',
              }}
            >
              {f === 'all' && '📅 All'}
              {f === 'upcoming' && '⏭️ Upcoming'}
              {f === 'featured' && '⭐ Featured'}
              {f === 'today' && '🕐 Today'}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div
                key={event._id}
                onClick={() => navigate(`/events/${event._id}`)}
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  transform: 'translateY(0)',
                }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-10px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                }}
              >
                {/* Header with gradient */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(147, 51, 234))',
                    padding: '2rem 1.5rem',
                    color: 'white',
                  }}
                >
                  <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 'bold' }}>
                    🏛️ {event.title}
                  </h2>
                  <p style={{ margin: 0, opacity: 0.9, fontSize: '0.875rem' }}>
                    {event.description || 'Spiritual service'}
                  </p>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ margin: '0.5rem 0', color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>
                      📍 {event.venue}
                    </p>
                    <p style={{ margin: '0.5rem 0', color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>
                      🕐 {new Date(event.startDate).toLocaleDateString()} | {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {/* Poojas */}
                  {event.poojas && event.poojas.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      {event.poojas.map((pooja, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'rgb(249, 250, 251)',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            marginBottom: '0.5rem',
                            fontSize: '0.875rem',
                          }}
                        >
                          <div style={{ fontWeight: '600' }}>{pooja.name}</div>
                          <div style={{ color: 'rgb(249, 115, 22)', fontWeight: 'bold', marginTop: '0.25rem' }}>
                            ₹{pooja.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'linear-gradient(to right, rgb(249, 115, 22), rgb(147, 51, 234))',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: '600',
                    }}
                  >
                    💳 Book Pooja
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem' }}>
              <p style={{ fontSize: '1.125rem', color: 'rgb(107, 114, 128)' }}>
                No events found for this filter
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
