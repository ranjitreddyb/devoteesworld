import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useProtectedRoute = (requireAdmin = false) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (requireAdmin && !isAdmin) {
      navigate('/home');
    }
  }, [isAuthenticated, isAdmin, requireAdmin, navigate]);
};