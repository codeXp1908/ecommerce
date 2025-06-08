import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="header_Container flex justify-between items-center p-5 bg-white shadow-sm">
        <span className='flex font-bold text-3xl p-2'>BUYiT.</span>
        
        {/* Desktop Navigation (visible on md screens and above) */}
        <ul className="hidden md:flex p-2 gap-5 font-semibold">
          <li><a href="#" className='header_link hover:text-amber-600'><i className="fa-solid fa-house"></i> Home</a></li>
          <li><a href="#" className='hover:text-amber-600'><i className="fa-solid fa-fire"></i> Trending</a></li>
          <li><a href="#" className='hover:text-amber-600'><i className="fa-solid fa-cart-shopping"></i> Cart</a></li>
          <li><a href="#" className='hover:text-amber-600'><i className="fa-solid fa-user"></i> Account</a></li>
        </ul>

        {/* Mobile Hamburger Button (visible on small screens) */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <i className="fa-solid fa-xmark text-xl"></i>
          ) : (
            <i className="fa-solid fa-bars text-xl"></i>
          )}
        </button>

        {/* Mobile Menu (dropdown when hamburger is clicked) */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 right-5 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-100">
            <ul className="flex flex-col p-2 gap-2 font-semibold">
              <li>
                <a href="#" className='header_link hover:bg-gray-100 block px-4 py-2 rounded-lg'>
                  <i className="fa-solid fa-house mr-2"></i> Home
                </a>
              </li>
              <li>
                <a href="#" className='hover:bg-gray-100 block px-4 py-2 rounded-lg'>
                  <i className="fa-solid fa-fire mr-2"></i> Trending
                </a>
              </li>
              <li>
                <a href="#" className='hover:bg-gray-100 block px-4 py-2 rounded-lg'>
                  <i className="fa-solid fa-cart-shopping mr-2"></i> Cart
                </a>
              </li>
              <li>
                <a href="#" className='hover:bg-gray-100 block px-4 py-2 rounded-lg'>
                  <i className="fa-solid fa-user mr-2"></i> Account
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  )
}

export default Header;