import React from 'react';

const InitialLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-base-100">
      <div className="text-center space-y-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content font-medium">Memuat website...</p>
      </div>
    </div>
  );
};

export default InitialLoader;
