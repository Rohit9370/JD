import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuth } from './lib/firebase';

import Header from './components/Header';
import Hero from './components/Hero';
import Officials from './components/Officials';
import Announcements from './components/Announcements';
import QuickLinks from './components/QuickLinks';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuth((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const HomePage = () => (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content">
        <Hero />
        <Announcements />
        {/* <QuickLinks /> */}
      </main>
      <Footer />
    </div>
  );

  const AdminRoute = () => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!user) {
      return <AdminLogin onLogin={() => {}} />;
    }

    return <AdminDashboard user={user} />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
