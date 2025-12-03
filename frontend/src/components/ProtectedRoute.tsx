import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface Props {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: Props) {
  const { user, isAuthenticated, initializeAuth } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log('🔐 ProtectedRoute - initializing auth');
    initializeAuth();
    setReady(true);
  }, [initializeAuth]);

  if (!ready) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>⏳ Loading...</div>;
  }

  console.log('🔐 ProtectedRoute - user:', user, 'requireAdmin:', requireAdmin, 'role:', user?.role);

  if (!isAuthenticated || !user) {
    console.log('❌ Not authenticated, redirecting to login');
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user.role !== 'admin') {
    console.log('❌ Not admin, redirecting to dashboard');
    return <Navigate to="/dashboard" />;
  }

  console.log('✅ ProtectedRoute - access granted');
  return <>{children}</>;
}
