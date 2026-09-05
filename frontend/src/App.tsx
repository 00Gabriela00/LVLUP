import { useState, useEffect, lazy, Suspense } from 'react';
import { StoreProvider } from './application/context/StoreProvider';
import { LandingPage } from './presentation/pages/LandingPage';

const AdminPortal = lazy(() =>
  import('./presentation/pages/AdminPortal').then((m) => ({ default: m.AdminPortal }))
);

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

  if (isAdminRoute) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-mono text-sm">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              Cargando Portal Administrativo...
            </div>
          </div>
        }
      >
        <AdminPortal />
      </Suspense>
    );
  }

  return <LandingPage />;
}

function App() {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}

export default App;
