import React from 'react';
import { SiDevbox, SiCardmarket, SiTripadvisor } from "react-icons/si";
import { TbPhotoStar } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { MdOutlineVideoSettings } from "react-icons/md";

function Services() {
  const services = [
    {
      icon: <SiDevbox />,
      title: "Developing",
      desc: "Build robust web and mobile applications tailored to your business needs.",
    },
    {
      icon: <TbPhotoStar />,
      title: "Graphics & Design",
      desc: "Creative designs that make your brand stand out with a professional look.",
    },
    {
      icon: <SiCardmarket />,
      title: "Digital Marketing",
      desc: "Boost your online presence with SEO, ads, and targeted campaigns.",
    },
    {
      icon: <TfiWrite />,
      title: "Writing & Content Creation",
      desc: "Engaging blogs, articles, and copywriting to connect with your audience.",
    },
    {
      icon: <MdOutlineVideoSettings />,
      title: "Video & Animation",
      desc: "High-quality video production and animations to tell your story visually.",
    },
    {
      icon: <SiTripadvisor />,
      title: "Business Consultation",
      desc: "Expert advice to scale your business and achieve long-term success.",
    },
  ];

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mt-10 mb-4">
        Discover Services Tailored for You
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Whether you need SEO experts, digital marketers, or developers, Brand
        Craft brings talent closer to your business goals.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-lg group"
          >


            <div className="absolute inset-0 bg-primary-content"></div>

            <div className="relative z-10 p-6 flex flex-col items-center text-center text-primary glass">
              <div className="text-5xl mb-4 text-success">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-sm mb-4">{service.desc}</p>
              <button className="btn btn-success bg-success glass text-primary  px-6 font-semibold">
                Hire Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
