import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import AOS from 'aos';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import 'aos/dist/aos.css';
import ThemeToggle from '../components/ThemeToggle';

const Layanan = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-base-200 overflow-hidden">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <div
          className="hero bg-base-100 py-10 shadow-md mt-10"
          data-aos="fade-down"
        >
          <div className="hero-content text-center">
            <div>
              <h1 className="text-3xl font-bold text-error">
                Layanan & Kontak Penting
              </h1>
              <p className="py-4 text-base-content/70">
                Informasi kontak resmi Padukuhan Karangsari
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className="flex-grow container mx-auto px-5 py-12"
          data-aos="fade-up"
        >
          <div className="grid gap-8 md:grid-cols-3">
            {/* Kepala Dukuh */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-error">Kepala Dukuh</h2>
                <FaWhatsapp className="text-4xl text-success" />
                <p className="text-lg font-semibold">+628179176313</p>
                <div className="card-actions mt-4">
                  <a
                    href="https://wa.me/628179176313"
                    className="btn btn-soft btn-error"
                  >
                    Hubungi
                  </a>
                </div>
              </div>
            </div>

            {/* Sekretaris Karang Taruna */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-error">
                  Sekretaris Karang Taruna
                </h2>
                <FaWhatsapp className="text-4xl text-success" />
                <p className="text-lg font-semibold">+6288238996534</p>
                <div className="card-actions mt-4">
                  <a
                    href="https://wa.me/6288238996534"
                    className="btn btn-soft btn-error"
                  >
                    Hubungi
                  </a>
                </div>
              </div>
            </div>

            {/* Instagram */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-error">
                  Instagram Karang Taruna
                </h2>
                <FaInstagram className="text-4xl text-error" />
                <p className="text-lg font-semibold">@adikarya_karangsari</p>
                <div className="card-actions mt-4">
                  <a
                    href="https://www.instagram.com/adikarya_karangsari"
                    className="btn btn-soft btn-error"
                  >
                    Hubungi
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ThemeToggle />
      </main>

      <Footer />
    </div>
  );
};

export default Layanan;
