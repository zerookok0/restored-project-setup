import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/layout';
import { Footer } from './components/layout';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <div className="min-h-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SiteProvider>
          <Layout />
        </SiteProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
