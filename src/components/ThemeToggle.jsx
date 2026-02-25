import React, { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="
        fixed bottom-20 right-6
        btn btn-circle btn-primary
        shadow-lg
        hover:scale-110
        transition-all duration-300
        z-50
      "
    >
      {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  );
}

export default ThemeToggle;
