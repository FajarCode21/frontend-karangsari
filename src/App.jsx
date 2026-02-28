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

const imagesToLoad = [
  '/img/home.webp',
  '/img/annur.webp',
  '/img/balai.webp',
  '/img/sd.webp',
  '/img/demografi.webp',
  '/img/sejarah.webp',
];

const App = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loaded = 0;

    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        setProgress(Math.round((loaded / imagesToLoad.length) * 100));
        if (loaded === imagesToLoad.length) {
          setTimeout(() => setLoading(false), 300);
        }
      };
    });
  }, []);

  return (
    <>
      {loading && <InitialLoader progress={progress} />}

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
