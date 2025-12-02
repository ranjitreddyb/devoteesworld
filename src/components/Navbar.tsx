import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'te' : 'en');
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-orange-600">
          DevoteeWorld
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-orange-600">{t('home')}</Link>
          <Link to="/events" className="hover:text-orange-600">{t('events')}</Link>
          <Link to="/astrology" className="hover:text-orange-600">{t('astrology')}</Link>
          <Link to="/retail" className="hover:text-orange-600">{t('retail')}</Link>
          
          <button onClick={toggleLanguage} className="px-3 py-1 border rounded">
            {i18n.language === 'en' ? 'తెలుగు' : 'English'}
          </button>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-orange-600">{t('dashboard')}</Link>
              <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="px-4 py-2 border rounded hover:bg-gray-100">
                {t('login')}
              </button>
              <button onClick={() => navigate('/register')} className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
                {t('register')}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
