import { useNavigate } from 'react-router-dom';
import { storage } from '../services/storage-service';

export default function Home() {
  const navigate = useNavigate();
  const user = storage.getUser();

  const styles = `
    @keyframes blob {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    .blob-animation {
      animation: blob 7s infinite;
    }
    .blob-animation-2 {
      animation: blob 7s infinite 2s;
    }
    .blob-animation-3 {
      animation: blob 7s infinite 4s;
    }
    .fade-in-animation {
      animation: fadeIn 0.8s ease-out;
    }
    .bounce-animation {
      animation: bounce 1s infinite;
    }
  `;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, rgb(88, 28, 135), rgb(255, 255, 255), rgb(255, 247, 237))' }}>
      <style>{styles}</style>

      {/* Hero Section */}
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '1rem', paddingRight: '1rem', overflow: 'hidden' }}>
        
        {/* Animated Background Blobs */}
        <div style={{ position: 'absolute', inset: 0, zIndex: -10 }}>
          <div style={{
            position: 'absolute',
            top: '5rem',
            left: '2.5rem',
            width: '18rem',
            height: '18rem',
            backgroundColor: 'rgb(192, 132, 250)',
            borderRadius: '50%',
            mixBlendMode: 'multiply',
            filter: 'blur(3rem)',
            opacity: 0.2,
          }} className="blob-animation"></div>
          <div style={{
            position: 'absolute',
            top: '10rem',
            right: '2.5rem',
            width: '18rem',
            height: '18rem',
            backgroundColor: 'rgb(251, 146, 60)',
            borderRadius: '50%',
            mixBlendMode: 'multiply',
            filter: 'blur(3rem)',
            opacity: 0.2,
          }} className="blob-animation-2"></div>
          <div style={{
            position: 'absolute',
            bottom: '-2rem',
            left: '5rem',
            width: '18rem',
            height: '18rem',
            backgroundColor: 'rgb(192, 132, 250)',
            borderRadius: '50%',
            mixBlendMode: 'multiply',
            filter: 'blur(3rem)',
            opacity: 0.2,
          }} className="blob-animation-3"></div>
        </div>

        {/* Hero Content */}
        <div style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2rem' }} className="fade-in-animation">
          
          {/* Logo */}
          <div style={{ display: 'inline-block', margin: '0 auto' }} className="bounce-animation">
            <div style={{ fontSize: '4.5rem' }}>🏛️</div>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(2rem, 8vw, 3.5rem)',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, rgb(234, 88, 12), rgb(147, 51, 234), rgb(234, 88, 12))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            DevoteesWorld
          </h1>

          {/* Tagline */}
          <p style={{ fontSize: '1.5rem', fontWeight: '600', color: 'rgb(55, 65, 81)' }}>
            🕉️ Hindu Religious Platform
          </p>

          {/* Description */}
          <p style={{
            fontSize: '1.125rem',
            color: 'rgb(75, 85, 99)',
            maxWidth: '42rem',
            margin: '0 auto',
            lineHeight: '1.75',
          }}>
            Connect with spiritual services, priests, temples, and fellow devotees. Explore poojas, rituals, and religious guidance on one unified platform.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', paddingTop: '2rem', flexWrap: 'wrap' }}>
            {user ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  style={{
                    padding: '1rem 2rem',
                    background: 'linear-gradient(to right, rgb(249, 115, 22), rgb(251, 146, 60))',
                    color: 'white',
                    borderRadius: '0.75rem',
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                  }}
                >
                  📊 Go to Dashboard
                </button>
                <button
                  onClick={() => navigate('/events')}
                  style={{
                    padding: '1rem 2rem',
                    background: 'white',
                    border: '3px solid rgb(234, 88, 12)',
                    color: 'rgb(234, 88, 12)',
                    borderRadius: '0.75rem',
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(255, 245, 238)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  🎪 Explore Events
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    padding: '1rem 2rem',
                    background: 'linear-gradient(to right, rgb(249, 115, 22), rgb(251, 146, 60))',
                    color: 'white',
                    borderRadius: '0.75rem',
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                  }}
                >
                  🚀 Login Now
                </button>
                <button
                  onClick={() => navigate('/register')}
                  style={{
                    padding: '1rem 2rem',
                    background: 'white',
                    border: '3px solid rgb(234, 88, 12)',
                    color: 'rgb(234, 88, 12)',
                    borderRadius: '0.75rem',
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(255, 245, 238)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  ✍️ Create Account
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '5rem 1rem', background: 'rgba(255, 255, 255, 0.5)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '4rem',
            background: 'linear-gradient(to right, rgb(234, 88, 12), rgb(147, 51, 234))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            ✨ Why Choose DevoteesWorld?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}>
            {[
              { icon: '🏛️', title: 'Temple Directory', desc: 'Find temples, priests, and spiritual services near you' },
              { icon: '🎪', title: 'Poojas & Rituals', desc: 'Book and schedule religious ceremonies and poojas' },
              { icon: '📚', title: 'Religious Knowledge', desc: 'Learn about rituals, festivals, and Hindu traditions' },
              { icon: '👥', title: 'Community', desc: 'Connect with devotees and share spiritual experiences' },
              { icon: '🙏', title: 'Guided Services', desc: 'Get guidance from experienced priests and scholars' },
              { icon: '📱', title: '24/7 Access', desc: 'Access spiritual services anytime, anywhere' },
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  background: 'linear-gradient(to bottom right, rgb(255, 237, 213), rgb(243, 232, 255))',
                  padding: '2rem',
                  borderRadius: '1.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'rgb(31, 41, 55)', marginBottom: '0.75rem' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'rgb(75, 85, 99)' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '4rem 1rem',
        background: 'linear-gradient(to right, rgb(249, 115, 22), rgb(147, 51, 234))',
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
            color: 'white',
          }}>
            {[
              { number: '2500+', label: 'Temples' },
              { number: '5000+', label: 'Priests' },
              { number: '50K+', label: 'Users' },
              { number: '24/7', label: 'Support' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{stat.number}</div>
                <div style={{ fontSize: '1.125rem', opacity: 0.9 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '5rem 1rem', background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.5), white)' }}>
        <div style={{
          maxWidth: '48rem',
          margin: '0 auto',
          textAlign: 'center',
          background: 'white',
          padding: '3rem',
          borderRadius: '1.875rem',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'rgb(31, 41, 55)' }}>
            Ready to Begin Your Spiritual Journey?
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'rgb(75, 85, 99)' }}>
            Join thousands of devotees connecting with spiritual services and building meaningful relationships on DevoteesWorld.
          </p>
          <button
            onClick={() => navigate(user ? '/dashboard' : '/register')}
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(to right, rgb(249, 115, 22), rgb(251, 146, 60))',
              color: 'white',
              borderRadius: '0.75rem',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              transition: 'all 0.3s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
            }}
          >
            {user ? '📊 Go to Dashboard' : '✍️ Get Started Today'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'rgb(17, 24, 39)', color: 'rgb(209, 213, 219)', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
          }}>
            <div>
              <h3 style={{ color: 'white', fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '1rem' }}>🏛️ DevoteesWorld</h3>
              <p style={{ fontSize: '0.875rem' }}>Hindu Religious Platform connecting devotees worldwide.</p>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '1rem' }}>Platform</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="#" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>Temples</a></li>
                <li><a href="#" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>Poojas</a></li>
                <li><a href="#" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>Events</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="#" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>About</a></li>
                <li><a href="#" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>Contact</a></li>
                <li><a href="#" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '1rem' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
            <p>© 2025 DevoteesWorld. All rights reserved. 🙏</p>
          </div>
        </div>
      </footer>
    </div>
  );
}