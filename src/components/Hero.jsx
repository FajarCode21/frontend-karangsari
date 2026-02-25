import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  const { children, title, img } = props;
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={img}
          className="w-full max-w-sm rounded-lg "
          data-aos="fade-right"
        />
        <div data-aos="fade-left">
          <h1 className="text-3xl font-bold text-error">{title}</h1>
          <p className="py-6 text-justify whitespace-pre-line">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
