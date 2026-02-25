import React from 'react';

const InitialLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-base-100 transition-opacity duration-500">
      {/* Logo */}
      <div className="mb-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg ring ring-error ring-offset-4 ring-offset-base-100 animate-pulse">
          <img
            src="/img/p1.jpg"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="mt-4 text-2xl font-bold text-error tracking-wide">
          Desa Karangsari
        </h1>

        <p className="text-sm opacity-70">Memuat halaman...</p>
      </div>

      {/* Progress Bar */}
      <div className="w-64">
        <progress className="progress progress-error w-full"></progress>
      </div>
    </div>
  );
};

export default InitialLoader;
