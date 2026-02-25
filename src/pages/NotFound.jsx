import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="text-center space-y-6">
        {/* Kode 404 */}
        <h1 className="text-8xl font-extrabold text-error">404</h1>

        {/* Pesan */}
        <h2 className="text-2xl font-bold">Halaman Tidak Ditemukan</h2>

        <p className="text-base-content/60 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
        </p>

        {/* Tombol */}
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={() => navigate('/')} className="btn btn-error">
            Ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
