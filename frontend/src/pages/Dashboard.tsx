import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../services/storage-service';
import apiService from '../services/api';

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
        console.log('📅 Fetching events...');
        const response = await apiService.get('/events');
        console.log('✅ Events fetched:', response.data);
        setEvents(response.data || []);
      } catch (error: any) {
        console.error('❌ Failed to fetch events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user, navigate]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>⏳ Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, rgb(245, 245, 245), rgb(255, 255, 255))' }}>
      <main style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(to right, rgb(249, 115, 22), rgb(147, 51, 234))', padding: '2rem', borderRadius: '1rem', color: 'white', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
            👋 Welcome, {user?.name}!
          </h1>
          <p style={{ margin: 0, opacity: 0.9 }}>Explore our sacred events and spiritual services</p>
        </div>

        <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>📅 Upcoming Events ({events.length})</h2>
          
          {events.length > 0 ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {events.map((event: any) => (
                <div key={event._id} style={{ padding: '1rem', background: 'rgb(249, 250, 251)', borderRadius: '0.75rem', border: '1px solid rgb(229, 231, 235)' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>{event.title}</h3>
                  <p style={{ margin: '0 0 0.5rem 0', color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>{event.description}</p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgb(31, 41, 55)' }}>📍 {event.venue} | {event.poojas?.length || 0} poojas</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'rgb(107, 114, 128)' }}>No events available</p>
          )}
        </div>
      </main>
    </div>
  );
}
