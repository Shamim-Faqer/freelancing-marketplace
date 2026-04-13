import React from 'react';
import Partner1 from "../assets/partners/partners (1).png";
import Partner2 from "../assets/partners/partners (2).png";
import Partner3 from "../assets/partners/partners (3).png";
import Partner4 from "../assets/partners/partners (4).png";
import Partner5 from "../assets/partners/partners (5).png";
import Partner6 from "../assets/partners/partners (6).png";
import Partner7 from "../assets/partners/partners (7).png";

function Partners() {
  const partners = [
    { src: Partner1, alt: "Partner 1" },
    { src: Partner2, alt: "Partner 2" },
    { src: Partner3, alt: "Partner 3" },
    { src: Partner4, alt: "Partner 4" },
    { src: Partner5, alt: "Partner 5" },
    { src: Partner6, alt: "Partner 6" },
    { src: Partner7, alt: "Partner 7" },
  ];

  return (
    <div className="px-4 md:px-8 lg:px-16">
      {/* Heading */}
      <h2 className="text-4xl text-primary md:text-5xl font-bold text-center mt-10 mb-4">
        Our Partners
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Here are some of our trusted partners
      </p>

      {/* Carousel */}
      <div className="carousel rounded-box gap-4">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="carousel-item card glass shadow-md flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={partner.src}
              alt={partner.alt}
              className="w-32 md:w-48 lg:w-64 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Partners;