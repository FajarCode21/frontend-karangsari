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
    const handleLoad = () => {
      const images = document.querySelectorAll('img');
      const total = images.length;

      if (total === 0) {
        setLoading(false);
        return;
      }

      let loaded = 0;

      images.forEach((img) => {
        if (img.complete) {
          loaded++;
          if (loaded === total) setLoading(false);
        } else {
          img.addEventListener('load', () => {
            loaded++;
            if (loaded === total) setLoading(false);
          });
          img.addEventListener('error', () => {
            loaded++;
            if (loaded === total) setLoading(false);
          });
        }
      });
    };

    window.addEventListener('load', handleLoad);

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <>
      {loading && <InitialLoader />}

      <div
        className={`transition-opacity duration-500 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
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
      </div>
    </>
  );
};

export default App;
