import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsAPI from '../api/news';
import ThemeToggle from '../components/ThemeToggle';

const DetailBerita = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const result = await NewsAPI.getNewsById(id);
      setData(result.data);
    } catch (error) {
      console.error(error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1 className="text-center mt-20">Loading...</h1>;
  }

  if (!data) {
    return <h1 className="text-center mt-20">Berita tidak ditemukan</h1>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-5 py-12 max-w-4xl mt-10">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={data.img}
                alt={data.title}
                className="w-full h-96 object-cover"
              />
            </figure>

            <div className="card-body">
              <p className="text-sm text-base-content/60">
                {new Date(data.created_at).toLocaleDateString()}
              </p>

              <h1 className="text-3xl font-bold">{data.title}</h1>

              <p className="whitespace-pre-line leading-relaxed text-justify">
                {data.body}
              </p>

              <div className="card-actions mt-6">
                <Link to="/berita" className="btn btn-outline">
                  Kembali
                </Link>
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

export default DetailBerita;
