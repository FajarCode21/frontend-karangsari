import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BeritaCard from '../components/BeritaCard';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NewsAPI from '../api/news';
import ThemeToggle from '../components/ThemeToggle';

const Berita = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const data = await NewsAPI.getAllNews();
      setNews(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />

      <div
        className="hero bg-base-100 py-10 shadow-md mt-10"
        data-aos="fade-down"
      >
        <div className="hero-content text-center">
          <h1 className="text-3xl font-bold text-error">Berita Desa</h1>
        </div>
      </div>

      <div className="container mx-auto px-5 py-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-center col-span-full">Loading...</p>
        ) : news.length === 0 ? (
          <p className="text-center col-span-full">Belum ada berita</p>
        ) : (
          news.map((item) => (
            <Link key={item.id} to={`/berita/${item.id}`}>
              <BeritaCard
                image={item.img}
                title={item.title}
                description={item.body}
                date={item.createdAt}
              />
            </Link>
          ))
        )}
      </div>

      <ThemeToggle />
      <Footer />
    </div>
  );
};

export default Berita;
