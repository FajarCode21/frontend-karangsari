import React from 'react';

const InitialLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-base-100">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
};

export default InitialLoader;
