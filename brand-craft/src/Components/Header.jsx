import React from 'react'
import logoIcon from '../assets/logo-icon.png'


function Header() {
  return (
    <div>
        <div className="navbar glass bg-[#0D19A4] font-bold shadow-sm text-primary-content">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-primary text-white lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>About</a></li>
        <li><a>Jobs</a></li>
        <li><a>My Jobs</a></li>
      </ul>
    </div>
    <a className="flex items-center text-2xl">
      <img src={logoIcon} alt="Logo" className="h-12 w-12 mr-2" /> Brand Craft
    </a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn btn-ghost btn-primary text-white">Log out</a>
  </div>
</div>
    </div>
  )
}

export default Header;
