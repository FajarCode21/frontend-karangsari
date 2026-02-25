import React from 'react';

const InitialLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-base-100 transition-opacity duration-500">
      <div className="mb-6 flex flex-col items-center">
        {/* Bola Loncat */}
        <div className="relative flex items-center justify-center">
          {/* Ring luar */}
          <div className="absolute w-28 h-28 rounded-full border-4 border-error opacity-20 animate-ping"></div>

          {/* Bola utama */}
          <div className="w-20 h-20 bg-error rounded-full shadow-xl animate-bounce"></div>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-error tracking-wide">
          Desa Karangsari
        </h1>

        <p className="text-sm opacity-70">Memuat halaman...</p>
      </div>

      <div className="w-64">
        <progress className="progress progress-error w-full"></progress>
      </div>
    </div>
  );
};

export default InitialLoader;
