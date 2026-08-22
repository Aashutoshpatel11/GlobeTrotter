import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#e8e4db] py-8 px-6 md:px-10 mt-12 flex flex-col md:flex-row items-center justify-between text-sm text-[var(--text-main)] font-semibold gap-4">
      <div className="flex items-center gap-6 flex-col md:flex-row">
        <span className="font-bold text-lg text-[var(--primary)] tracking-tight">GlobeTrotter</span>
        <span className="text-gray-500 font-medium">© 2024 GlobeTrotter. Discover your next adventure.</span>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        <a href="#about" className="hover:text-[var(--primary)] hover:underline">About Us</a>
        <a href="#terms" className="hover:text-[var(--primary)] hover:underline">Terms of Service</a>
        <a href="#privacy" className="hover:text-[var(--primary)] hover:underline">Privacy Policy</a>
        <a href="#contact" className="hover:text-[var(--primary)] hover:underline">Contact Support</a>
      </div>
    </footer>
  );
}

