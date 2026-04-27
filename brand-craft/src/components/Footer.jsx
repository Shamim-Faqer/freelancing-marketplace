import React from 'react'
import logoIcon from '../assets/logo-icon.png'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";





function Footer() {
  return (
    <div><footer className="footer glass footer-horizontal footer-center bg-[#0D19A4] text-white p-10">
  <aside>
    <img src={logoIcon} className='h-24' alt="Logo" />
    <p className="font-bold text-3xl">
      Brand Craft Ltd.
      <br />
      Providing reliable tech since 2014
    </p>
    <p className='font-bold p-2'>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav>
    <div className="grid grid-flow-col gap-4 text-xl">
      <a>
        <FaFacebook />
      </a>
      <a>
        <FaInstagram />
      </a>
      <a>
        <FaPinterest />
      </a>
      <a>
        <FaWhatsapp />
      </a>
      <a><FaSquareXTwitter /></a>
      <a><FaLinkedin /></a>
      <a><FaYoutube /></a>
    </div>
  </nav>
</footer></div>
  )
}

export default Footer