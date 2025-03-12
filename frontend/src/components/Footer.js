import React from 'react';

const Footer = ({ className }) => (
  <footer className={`bg-gray-800 text-white py-4 ${className}`} style={{ border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '15px 15px 0 0', margin: '0 10px' }}>
    <div className="container mx-auto text-center px-4">
      <p className="text-sm">
        © {new Date().getFullYear()} Dairy-Farm-Management-System. All rights reserved.
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Empowering dairy farmers with modern management solutions
      </p>
    </div>
  </footer>
);

export default Footer;