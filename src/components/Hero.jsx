import React, { useState, useEffect } from "react";
import Officials from "./Officials";

// Import slider images
import chikhaldara from "/assets/slider/chikhaldara87088 (1).jpg";
import lonarLake from "/assets/slider/LonarLake.png";
import lonarTemple from "/assets/slider/LonarTemple.jpg";
import melghat from "/assets/slider/melghat.png";
import panjabroDeshmukh from "/assets/slider/panjabrodeshmukh.png";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    {
      src: lonarLake,
      alt: "Lonar Lake",
      title: "Lonar Lake",
      desc: "Ancient meteor crater lake, one of the largest basaltic impact craters on Earth, showcasing Maharashtra's natural heritage.",
    },
    {
      src: lonarTemple,
      alt: "Lonar Temples",
      title: "Ancient Temples of Lonar",
      desc: "Historic temples surrounding the crater, showcasing ancient Indian architecture and spiritual heritage of Maharashtra.",
    },
    {
      src: melghat,
      alt: "Melghat Tiger Reserve",
      title: "Melghat Tiger Reserve",
      desc: "Home to the majestic Royal Bengal Tiger and diverse wildlife in Maharashtra, a Project Tiger reserve protecting biodiversity.",
    },
    {
      src: chikhaldara,
      alt: "Chikhaldara Hill Station",
      title: "Chikhaldara Hill Station",
      desc: "Maharashtra's only hill station with breathtaking views and serene environment, promoting eco-tourism and regional development.",
    },
    {
      src: panjabroDeshmukh,
      alt: "Dr. Panjabrao Deshmukh",
      title: "Dr. Panjabrao Deshmukh",
      desc: "Former Chief Minister and pioneer of agricultural education and rural development, honoring his legacy in Maharashtra's progress.",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <section className="bg-white py-8">
      <Officials />

      {/* Image Slider with Dots Navigation */}
      <div className="relative overflow-hidden mx-auto w-full max-w-7xl h-[500px] shadow-2xl rounded-lg">
        {/* Slider Container */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {sliderImages.map((image, idx) => (
            <div key={idx} className="relative flex-shrink-0 w-full h-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI1MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDUwMCIgZmlsbD0iI2NjY2NjYyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRyYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2NjY2NjYiIGZvbnQtc2l6ZT0iMjQiPkltYWdlPC90ZXh0Pjwvc3ZnPg==";
                }}
              />
              {/* White Text Overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center p-8 max-w-4xl">
                  <h2 className="text-white text-4xl md:text-6xl font-bold drop-shadow-2xl mb-6 tracking-wide">
                    {image.title}
                  </h2>
                  <p className="text-white text-lg md:text-xl drop-shadow-xl leading-relaxed font-medium">
                    {image.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* White Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-white ${
                currentSlide === index
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-transparent hover:bg-white/50 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
