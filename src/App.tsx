// App.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import MainLayout from './app/layout/main-layout';
import { routes } from './routes';

function App() {
  const location = useLocation();

  return (
    <MainLayout currentPath={location.pathname}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default App;
