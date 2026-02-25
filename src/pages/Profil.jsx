import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Footer from '../components/Footer.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ThemeToggle from '../components/ThemeToggle.jsx';

// Data
import sejarah from '../DataDummy/sejarah.js';
import demografi from '../DataDummy/demografi.js';

const Profil = () => {
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
        {/* Sejarah */}
        <div className="pt-15">
          <Hero img={sejarah.img} title={sejarah.title}>
            {sejarah.body}
          </Hero>
        </div>

        {/* Data Geografis */}
        <div className="hero  min-h-screen  lg:px-20">
          <div className="hero-content flex-col lg:flex-row w-full gap-10">
            {/* MAP */}
            <div className="w-full lg:w-1/2 h-[70vh]" data-aos="fade-right">
              <iframe
                className="w-full h-full rounded-2xl shadow-xl"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6457.519311016488!2d110.58681464946191!3d-7.8767850025984405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a4c2339773f63%3A0x69919e0256b22f2!2sBalai%20Padukuhan%20Karangsari!5e0!3m2!1sid!2sid!4v1771832261947!5m2!1sid!2sid"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Balai Padukuhan Karangsari"
              />
            </div>

            {/* TEXT */}
            <div
              className="lg:w-1/2 bg-base-100 p-8 rounded-2xl shadow-xl"
              data-aos="fade-left"
            >
              <h1 className="text-3xl font-bold text-error mb-4">Geografis</h1>

              <p className="leading-relaxed">
                Secara umum, wilayah Kalurahan Pengkol berada pada koordinat:
              </p>

              <ol className="list-decimal list-inside leading-relaxed mb-2">
                <li>Lintang Selatan: 7°52′44.699″ LS</li>
                <li>Bujur Timur: 110°35′54.699″ BT</li>
              </ol>

              <p className="leading-relaxed">
                Ketinggian berada di zona perbukitan sekitar 300 – 500 mdpl
                (meter di atas permukaan laut). Padukuhan Karangsari terletak di
                dalam wilayah Kalurahan Pengkol. Batas wilayah:
              </p>

              <ol className="list-decimal list-inside leading-relaxed mt-2">
                <li>Utara: Kapanewon Gedangsari</li>
                <li>Timur: Kapanewon Ngawen</li>
                <li>Selatan: Kapanewon Karangmojo & Wonosari</li>
                <li>Barat: Kapanewon Gedangsari</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Data Demografi */}
        <Hero img={demografi.img} title={demografi.title}>
          {demografi.body}
        </Hero>

        <ThemeToggle />
      </main>

      <Footer />
    </div>
  );
};
export default Profil;
