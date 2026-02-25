import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Beranda from './pages/Beranda.jsx';
import Profil from './pages/Profil.jsx';
import Layanan from './pages/Layanan.jsx';
import Berita from './pages/Berita.jsx';
import NotFound from './pages/NotFound.jsx';
import DetailBerita from './pages/DetailBerita.jsx';
import Login from './pages/Login.jsx';
import DashboardAdmin from './pages/DashboardAdmin.jsx';
import InitialLoader from './components/InitialLoader.jsx';
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const images = Array.from(document.images);

    if (images.length === 0) {
      setLoading(false);
      return;
    }

    let loaded = 0;

    const handleLoad = () => {
      loaded++;
      if (loaded === images.length) {
        setTimeout(() => setLoading(false), 500);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        handleLoad();
      } else {
        img.addEventListener('load', handleLoad);
        img.addEventListener('error', handleLoad);
      }
    });
  }, []);

  if (loading) return <InitialLoader />;

  return (
    <Routes>
      <Route path="/" element={<Beranda />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/layanan" element={<Layanan />} />
      <Route path="/berita" element={<Berita />} />
      <Route path="/berita/:id" element={<DetailBerita />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
