import { useState, useEffect } from 'react';
import { StoreProvider } from './application/context/StoreProvider';
import { LandingPage } from './presentation/pages/LandingPage';
import { AdminPortal } from './presentation/pages/AdminPortal';

function AppRouter() {
  const [isAdminRoute, setIsAdminRoute] = useState(() => {
    return window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(window.location.pathname.startsWith('/admin') || window.location.hash === '#admin');
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return isAdminRoute ? <AdminPortal /> : <LandingPage />;
}

function App() {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}

export default App;
