import React from 'react'
import { SiDevbox } from "react-icons/si";
import { SiCardmarket } from "react-icons/si";

import { TbPhotoStar } from "react-icons/tb";

import { TfiWrite } from "react-icons/tfi";

import { MdOutlineVideoSettings } from "react-icons/md";

import { SiTripadvisor } from "react-icons/si";




function Services() {
  return (
    <div>
        <h2 className='text-5xl font-bold text-center text-primary  p-3 mt-6'>Discover Services Tailored for You
</h2>
<p className='text-center p-3'>Whether you need SEO experts, digital marketers, or developers, Brand Craft brings talent closer to your business goals.
</p>
<div className="servicesCards flex flex-wrap gap-6 p-3 justify-center items-center">


    <div className="firstcard">
      <div className="card bg-primary-content glass w-96 shadow-sm">

  <figure className="px-10 pt-10 text-5xl text-primary">
   <SiDevbox />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Developing</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions pt-3">
      <button className="btn btn-soft btn-primary glass">Buy Now</button>
    </div>
  </div>
</div>
</div>

<div className="secondcard"><div className="card bg-primary-content glass w-96 shadow-sm">

  <figure className="px-10 pt-10 text-5xl text-primary">
    <TbPhotoStar />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Graphics & Design</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions pt-3">
      <button className="btn btn-soft btn-primary glass">Buy Now</button>
    </div>
  </div>
</div>
</div>


<div className="thirdcard"><div className="card bg-primary-content glass w-96 shadow-sm">

  <figure className="px-10 pt-10 text-5xl text-primary">
    <SiCardmarket />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Digital Marketing</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions pt-3">
      <button className="btn btn-soft btn-primary glass">Buy Now</button>
    </div>
  </div>
</div>
</div>


<div className="fourthcard"><div className="card bg-primary-content glass w-96 shadow-sm">

  <figure className="px-10 pt-10 text-5xl text-primary">
    <TfiWrite />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Writing & Content Creation</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions pt-3">
      <button className="btn btn-soft btn-primary glass">Buy Now</button>
    </div>
  </div>
</div>
</div>



<div className="fifthcard"><div className="card bg-primary-content glass w-96 shadow-sm">

  <figure className="px-10 pt-10 text-5xl text-primary">
    <MdOutlineVideoSettings />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Video & Animation</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions pt-3">
      <button className="btn btn-soft btn-primary glass">Buy Now</button>
    </div>
  </div>
</div>
</div>




<div className="sixthcard"><div className="card  bg-primary-content glass w-96 shadow-sm">

  <figure className="px-10 pt-10 text-5xl text-primary">
  <SiTripadvisor />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Business Consultation</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions pt-3">
      <button className="btn btn-soft btn-primary glass">Buy Now</button>
    </div>
  </div>
</div>
</div>






</div>
</div>
  )
}

export default Services;