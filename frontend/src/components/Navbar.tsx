import { useNavigate } from 'react-router-dom';
import { storage } from '../services/storage-service';
import toast from 'react-hot-toast';

const navbarStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 2rem',
  background: 'linear-gradient(to right, rgb(249, 115, 22), rgb(147, 51, 234))',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const logoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  cursor: 'pointer',
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const navCenterStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  flex: 1,
  justifyContent: 'center',
  color: 'white',
};

const navRightStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const buttonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  borderRadius: '0.5rem',
  border: 'none',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontSize: '0.875rem',
};

const primaryButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: 'white',
  color: 'rgb(249, 115, 22)',
};

const secondaryButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: 'transparent',
  color: 'white',
  border: '2px solid white',
};

export default function Navbar() {
  const navigate = useNavigate();
  const user = storage.getUser();

  const handleLogout = () => {
    storage.clear();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (!user) {
    return (
      <nav style={navbarStyle}>
        <div onClick={() => navigate('/')} style={logoStyle}>
          🏛️ DevoteesWorld
        </div>
        <div style={navRightStyle}>
          <button
            onClick={() => navigate('/login')}
            style={secondaryButtonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            🔐 Login
          </button>
          <button
            onClick={() => navigate('/register')}
            style={primaryButtonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgb(255, 245, 238)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ✍️ Register
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav style={navbarStyle}>
      {/* Logo */}
      <div onClick={() => navigate('/dashboard')} style={logoStyle}>
        🏛️ DevoteesWorld
      </div>

      {/* Center - User Info & Events */}
      <div style={navCenterStyle}>
        <span style={{ fontSize: '0.95rem' }}>👤 {user.name}</span>
        <button
          onClick={() => navigate('/events')}
          style={secondaryButtonStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          📅 Events
        </button>
        {user.role === 'admin' && (
          <button
            onClick={() => navigate('/admin')}
            style={secondaryButtonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ⚙️ Admin
          </button>
        )}
      </div>

      {/* Right - Logout */}
      <div style={navRightStyle}>
        <button
          onClick={handleLogout}
          style={primaryButtonStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgb(255, 245, 238)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}