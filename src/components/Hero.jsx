import React from "react";
import Officials from "./Officials";

// Import local images
import chikhaldara from "../../assets/chikhaldara.jpg";
import chikhaldara87088 from "../../assets/chikhaldara87088.avif";
import lonarLake from "../../assets/LonarLake.jpg";
import lonarTemple from "../../assets/LonarTemple.jpg";
import melghatTiger from "../../assets/MelghatTigerReserver.jpg";
import gadgeBaba from "../../assets/gadgeBaba.jpg";
import panjabroDeshmukh from "../../assets/panjabrodeshmukh.jpg";

const Hero = () => {
  const heritageImages = [
    {
      src: lonarLake,
      alt: "Lonar Lake",
      title: "Lonar Lake",
      desc: "Ancient meteor crater lake, one of the largest basaltic impact craters on Earth.",
    },
    {
      src: lonarTemple,
      alt: "Lonar Temples",
      title: "Lonar Temples",
      desc: "Historic temples surrounding the crater, showcasing ancient Indian architecture.",
    },
    {
      src: melghatTiger,
      alt: "Melghat Tiger Reserve",
      title: "Melghat Tiger Reserve",
      desc: "Home to the majestic Royal Bengal Tiger and diverse wildlife in Maharashtra.",
    },
    {
      src: chikhaldara,
      alt: "Chikhaldara",
      title: "Chikhaldara",
      desc: "The only hill station in Maharashtra, offering scenic beauty and pleasant climate.",
    },
    {
      src: chikhaldara87088,
      alt: "Chikhaldara Hill Station",
      title: "Chikhaldara Hill Station",
      desc: "Maharashtra's premier hill station with breathtaking views and serene environment.",
    },
    {
      src: gadgeBaba,
      alt: "Gadge Baba",
      title: "Gadge Baba",
      desc: "Social reformer and saint who dedicated his life to education and social upliftment.",
    },
    {
      src: panjabroDeshmukh,
      alt: "Dr. Panjabrao Deshmukh",
      title: "Dr. Panjabrao Deshmukh",
      desc: "Former Chief Minister, pioneer of agricultural education and rural development.",
    },
  ];

  // Duplicate list for smooth looping
  const scrollImages = [...heritageImages, ...heritageImages];

  return (
    <section className="bg-gradient-to-r from-blue-50 to-orange-50 py-8">
      <Officials />

      {/* Slider */}
      <div className="w-full relative overflow-hidden h-[400px] md:h-[500px]">
        <div
          className="flex animate-marquee"
          style={{ width: `${scrollImages.length * 100}vw` }}
        >
          {scrollImages.map((image, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0"
              style={{ width: "100vw" }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDQwMCIgZmlsbD0iI2NjY2NjYyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRyYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2NzciIGZvbnQtc2l6ZT0iMjQiPkltYWdlPC90ZXh0Pjwvc3ZnPg==";
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center">
                <div className="text-center p-6">
                  <h3 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg mb-3">
                    {image.title}
                  </h3>
                  <p className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 text-gray-800 text-sm md:text-base max-w-lg mx-auto">
                    {image.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
