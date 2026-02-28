import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Hero from '../components/Hero.jsx';
import Divider from '../components/Divider.jsx';
import { ReactTyped } from 'react-typed';
import AOS from 'aos';
import 'aos/dist/aos.css';

import ThemeToggle from '../components/ThemeToggle.jsx';

// DATA
import higlihtData from '../DataDummy/highlight.js';
import tentangDesa from '../DataDummy/tentangDesa.js';
import { Link } from 'react-router-dom';

const Beranda = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <Navbar />
      <main className="flex-grow">
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(/img/home.webp)`,
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-xl font-bold" data-aos="fade-right">
                Selamat Datang di
              </h1>
              <h2
                className="mb-5 text-2xl font-bold text-error"
                data-aos="fade-right"
              >
                <ReactTyped
                  strings={['Padukuhan Karangsari']}
                  typeSpeed={100}
                  backSpeed={50}
                  loop
                />
              </h2>
              <p className="mb-5 text-sm" data-aos="fade-left">
                Padukuhan Karangsari merupakan salah satu dusun yang terletak di
                Kalurahan Pengkol, Kapanewon Nglipar, Kabupaten Gunungkidul.
              </p>

              <Link
                to="/profil"
                className="btn btn-outline btn-error text-sm"
                data-aos="fade-up"
              >
                Tentang Desa
              </Link>
            </div>
          </div>
        </div>

        {/* Tentang Desa */}
        <Hero title={tentangDesa.title} img={tentangDesa.img}>
          {tentangDesa.body}
        </Hero>

        {/* Highlight */}
        <div className="flex flex-col gap-4 items-center mt-8">
          <h1 className="text-3xl font-bold text-error" data-aos="fade-up">
            Highlight
          </h1>
          <Divider data={higlihtData} />
        </div>

        <ThemeToggle />
      </main>

      <Footer />
    </div>
  );
};
export default Beranda;
