import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.access_token && data.user) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        console.log('✅ Login successful, stored in localStorage');
        toast.success('✅ Login successful!');
        
        // Hard reload to reset everything
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 300);
      } else {
        toast.error(data.message || '❌ Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('❌ Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgb(147, 51, 234), rgb(249, 115, 22))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: 'white', padding: '3rem', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)', maxWidth: '450px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'rgb(31, 41, 55)' }}>
          🔐 Login
        </h1>
        <p style={{ textAlign: 'center', color: 'rgb(107, 114, 128)', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Welcome back to DevoteesWorld
        </p>

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'rgb(31, 41, 55)', fontSize: '0.95rem' }}>
              📧 Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid rgb(229, 231, 235)', borderRadius: '0.75rem', fontSize: '1rem', boxSizing: 'border-box' }}
              required
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'rgb(31, 41, 55)', fontSize: '0.95rem' }}>
              🔑 Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid rgb(229, 231, 235)', borderRadius: '0.75rem', fontSize: '1rem', boxSizing: 'border-box' }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '0.875rem', background: loading ? 'rgb(200, 200, 200)' : 'linear-gradient(to right, rgb(249, 115, 22), rgb(147, 51, 234))', color: 'white', border: 'none', borderRadius: '0.75rem', fontWeight: 'bold', fontSize: '1.05rem', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? '⏳ Logging in...' : '✨ Login'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', borderTop: '1px solid rgb(229, 231, 235)', paddingTop: '1.5rem' }}>
          <p style={{ color: 'rgb(107, 114, 128)', margin: 0 }}>
            Don't have an account?{' '}
            <a href="/register" style={{ color: 'rgb(249, 115, 22)', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.05rem' }}>
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
