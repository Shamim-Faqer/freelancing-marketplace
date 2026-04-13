import React from 'react'
import HeroImage from '../assets/hero.png';
import HeroImg2 from '../assets/element.png';




function Hero() {
  return (
    <div><div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <div className='flex-1'><img
      src={HeroImg2}
      className="max-w-sm rounded-lg shadow-2xl"
    /></div>
    <div className='flex-1'>
      <h1 className="text-5xl font-bold">Empower Your Business with Brand Craft</h1>
      <p className="py-6">
        Connect with top clients and skilled professionals worldwide. From developers to digital marketers, Brand Craft is your trusted freelancing marketplace to grow and succeed.

      </p>
      <button className="btn btn-primary ">Get Started</button>
    </div>
  </div>
</div></div>
  )
}

export default Hero