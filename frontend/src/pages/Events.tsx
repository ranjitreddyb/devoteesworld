import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import toast from 'react-hot-toast';

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await apiService.get('/events', { params: { filter } });
      setEvents(response.data || []);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, rgb(245, 245, 245), rgb(255, 255, 255))' }}>
      {/* Main Content */}
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(to right, rgb(249, 115, 22), rgb(147, 51, 234))',
          padding: '2rem',
          borderRadius: '1rem',
          color: 'white',
          marginBottom: '2rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', margin: 0 }}>
            🎪 Events & Poojas
          </h1>
          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
            Discover upcoming spiritual services and ceremonies
          </p>
        </div>

        {/* Filter Section */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '1rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
          {['all', 'upcoming', 'featured', 'today'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: filter === f ? 'linear-gradient(to right, rgb(249, 115, 22), rgb(147, 51, 234))' : 'rgb(229, 231, 235)',
                color: filter === f ? 'white' : 'rgb(31, 41, 55)',
              }}
              onMouseOver={(e) => {
                if (filter !== f) {
                  e.currentTarget.style.background = 'rgb(209, 213, 219)';
                }
              }}
              onMouseOut={(e) => {
                if (filter !== f) {
                  e.currentTarget.style.background = 'rgb(229, 231, 235)';
                }
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {loading ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'rgb(107, 114, 128)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
              <p>Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            events.map((event: any, idx: number) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  border: '1px solid rgb(229, 231, 235)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Image */}
                <div style={{
                  background: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(147, 51, 234))',
                  height: '150px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                }}>
                  🎪
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: 'rgb(31, 41, 55)', fontSize: '1.125rem' }}>
                    {event.title}
                  </h3>
                  <p style={{ margin: '0 0 1rem 0', color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>
                    {event.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'rgb(107, 114, 128)' }}>
                    <div>📍 {event.location}</div>
                    <div>📅 {event.date}</div>
                    <div>⏰ {event.time}</div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{
                  padding: '1rem 1.5rem',
                  background: 'rgb(249, 250, 251)',
                  borderTop: '1px solid rgb(229, 231, 235)',
                  display: 'flex',
                  gap: '0.5rem',
                }}>
                  <button
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      background: 'linear-gradient(to right, rgb(249, 115, 22), rgb(147, 51, 234))',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                    onClick={() => toast.success('Booked! 🎉')}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'rgb(107, 114, 128)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎪</div>
              <p>No events available</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'rgb(17, 24, 39)',
        color: 'rgb(209, 213, 219)',
        padding: '3rem 1rem',
        marginTop: '3rem',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
          }}>
            <div>
              <h3 style={{ color: 'white', fontWeight: 'bold', fontSize: '1.125rem', margin: 0, marginBottom: '1rem' }}>
                🏛️ DevoteesWorld
              </h3>
              <p style={{ fontSize: '0.875rem', margin: 0 }}>Hindu Religious Platform connecting devotees worldwide.</p>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold', margin: 0, marginBottom: '1rem' }}>Platform</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: 0 }}>
                <li><a href="#" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>Temples</a></li>
                <li><a href="#" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>Poojas</a></li>
                <li><a href="#" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>Events</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold', margin: 0, marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: 0 }}>
                <li><a href="#" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>About</a></li>
                <li><a href="#" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>Contact</a></li>
                <li><a href="#" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold', margin: 0, marginBottom: '1rem' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: 0 }}>
                <li><a href="#" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>Privacy</a></li>
                <li><a href="#" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>Terms</a></li>
                <li><a href="#" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>Cookies</a></li>
              </ul>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid rgb(55, 65, 81)',
            paddingTop: '2rem',
            textAlign: 'center',
            fontSize: '0.875rem',
          }}>
            <p style={{ margin: 0 }}>© 2025 DevoteesWorld. All rights reserved. 🙏</p>
          </div>
        </div>
      </footer>
    </div>
  );
}