import React, { useEffect, useState } from "react";

const images = [
  "https://cdn.vectorstock.com/i/500p/45/80/interior-background-of-modern-men-clothing-store-vector-22494580.jpg",
  "https://img.freepik.com/premium-vector/modern-sale-banner-website-slider-template-design_54925-46.jpg",
  "https://static.vecteezy.com/system/resources/previews/002/478/302/original/sale-electronics-banner-background-free-vector.jpg",
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Slider container */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px]">
        {/* Image Layer */}
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Slide ${idx}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white p-1 sm:p-2 rounded-full shadow hover:bg-gray-100 text-xs sm:text-base"
        >
          &#8592;
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white p-1 sm:p-2 rounded-full shadow hover:bg-gray-100 text-xs sm:text-base"
        >
          &#8594;
        </button>
      </div>

     
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === idx ? "bg-gray-800 scale-110" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
