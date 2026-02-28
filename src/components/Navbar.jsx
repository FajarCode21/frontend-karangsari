import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div
      className="navbar fixed top-0 z-50
  bg-base-100/40 backdrop-blur-lg
  border-b border-base-300/30
  shadow-md"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/profil">Profil</Link>
            </li>
            <li>
              <Link to="/layanan">Layanan</Link>
            </li>
            <li>
              <Link to="/berita">Berita</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col pl-6 min-w-max">
          <Link to="/" className=" font-bold text-error">
            Padukuhan Karangsari
          </Link>
          <p className="text-xs opacity-70">Nglipar, Pengkol, Karangsari</p>
        </div>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          <li>
            <Link to="/">Beranda</Link>
          </li>
          <li>
            <Link to="/profil">Profil</Link>
          </li>
          <li>
            <Link to="/layanan">Layanan</Link>
          </li>
          <li>
            <Link to="/berita">Berita</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/login" className="btn btn-error text-white">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
