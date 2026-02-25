import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
const BeritaCard = ({ image, title, description, date }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <div
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300"
      data-aos="zoom-in"
    >
      {/* Gambar */}
      <figure className="h-56 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </figure>

      {/* Isi Card */}
      <div className="card-body">
        {/* Tanggal */}
        <p className="text-sm text-base-content/60">{date}</p>

        {/* Judul */}
        <h2 className="card-title text-lg">{title}</h2>

        {/* Deskripsi */}
        <p className="text-justify line-clamp-3">{description}</p>

        {/* Tombol */}
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-soft btn-error btn-sm">
            Baca Selengkapnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeritaCard;
