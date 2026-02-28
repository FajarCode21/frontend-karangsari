import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DividerHorizontal = ({ data = [] }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <>
      {data.map((item, index) => {
        const isReverse = index % 2 !== 0;

        return (
          <div
            className={`flex flex-col md:flex-row items-stretch w-full gap-4 p-4 ${
              isReverse ? 'md:flex-row-reverse' : ''
            }`}
            key={index}
          >
            {/* Gambar */}
            <div
              className="card bg-base-300 rounded-box min-h-24 flex-1 flex items-center justify-center overflow-hidden"
              data-aos={isReverse ? 'fade-left' : 'fade-right'}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Konten */}
            <div
              className="card bg-base-200 rounded-box min-h-24 flex-[2] flex items-center justify-center"
              data-aos={isReverse ? 'fade-right' : 'fade-left'}
            >
              <div className="text-center p-4 h-full">
                <h2 className="font-bold">{item.title}</h2>
                <p className="text-sm text-justify ">{item.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DividerHorizontal;
