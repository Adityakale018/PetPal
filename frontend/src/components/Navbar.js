import React, { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between relative">
      <div className="text-xl font-bold">Pet Platform</div>
      <button className="md:hidden block ml-4" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <div className={`md:flex md:items-center md:space-x-4 absolute md:static top-full left-0 w-full md:w-auto bg-blue-600 md:bg-transparent z-40 transition-all duration-200 ${open ? 'block' : 'hidden'}`}>
        <a href="/" className="block px-4 py-2 md:inline hover:underline">Home</a>
        <a href="/pets" className="block px-4 py-2 md:inline hover:underline">Pets</a>
        <a href="/daycare" className="block px-4 py-2 md:inline hover:underline">Daycare</a>
        <a href="/feedback" className="block px-4 py-2 md:inline hover:underline">Feedback</a>
        <a href="/login" className="block px-4 py-2 md:inline hover:underline">Login</a>
        <span className="block px-4 py-2 md:inline"><DarkModeToggle /></span>
      </div>
    </nav>
  );
};

export default Navbar;
