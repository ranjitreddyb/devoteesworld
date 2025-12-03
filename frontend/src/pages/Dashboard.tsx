import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../services/storage-service';
import apiService from '../services/api';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = storage.getUser();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await apiService.get('/events');
        setEvents(response.data || []);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', width: '100%', background: 'linear-gradient(to bottom, rgb(245, 245, 245), rgb(255, 255, 255))', overflowX: 'hidden' }}>
      <main style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{
          background: 'linear-gradient(to right, rgb(249, 115, 22), rgb(147, 51, 234))',
          padding: '2rem',
          borderRadius: '1rem',
          color: 'white',
          marginBottom: '2rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
            👋 Welcome, {user?.name}!
          </h1>
          <p style={{ margin: 0, opacity: 0.9 }}>
            Explore spiritual services and connect with the community
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {[
            { icon: '🏛️', label: 'Temples', value: '2,500+' },
            { icon: '🙏', label: 'Services', value: '5,000+' },
            { icon: '👥', label: 'Devotees', value: '50K+' },
            { icon: '📅', label: 'Events', value: events.length },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgb(229, 231, 235)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
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
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ color: 'rgb(107, 114, 128)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'rgb(31, 41, 55)' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgb(229, 231, 235)',
          overflow: 'hidden',
          marginBottom: '2rem',
        }}>
          <div style={{
            background: 'linear-gradient(to right, rgb(249, 115, 22), rgb(147, 51, 234))',
            padding: '1.5rem',
            color: 'white',
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
              📅 Upcoming Events
            </h2>
          </div>

          <div style={{ padding: '1.5rem' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'rgb(107, 114, 128)' }}>
                <p>⏳ Loading events...</p>
              </div>
            ) : events.length > 0 ? (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {events.map((event: any, idx: number) => (
                  <div
                    key={idx}
                    style={{
                      padding: '1.5rem',
                      background: 'rgb(249, 250, 251)',
                      borderRadius: '0.75rem',
                      border: '1px solid rgb(229, 231, 235)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgb(243, 244, 246)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgb(249, 250, 251)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                    }}
                  >
                    <h3 style={{ margin: '0 0 0.5rem 0', color: 'rgb(31, 41, 55)', fontSize: '1.125rem' }}>
                      {event.title}
                    </h3>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'rgb(107, 114, 128)' }}>
                <p>🎪 No events available</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer style={{
        background: 'rgb(17, 24, 39)',
        color: 'rgb(209, 213, 219)',
        padding: '3rem 1rem',
        marginTop: '3rem',
        width: '100%',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', fontSize: '0.875rem' }}>
          <p style={{ margin: 0 }}>© 2025 DevoteesWorld. All rights reserved. 🙏</p>
        </div>
      </footer>
    </div>
  );
}
