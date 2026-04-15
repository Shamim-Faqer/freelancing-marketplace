import React from "react";
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
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mt-10 mb-4">
        Our Partners
      </h2>
      <p className="text-center text-gray-600 mb-12">
        Trusted by leading companies worldwide
      </p>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 place-items-center">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="bg-white glass rounded-xl shadow-md p-4 flex items-center justify-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={partner.src}
              alt={partner.alt}
              className="w-28 md:w-36 lg:w-44 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Partners;
