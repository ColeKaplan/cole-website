'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './Header.css';

function Header() {
  const [activeLink, setActiveLink] = useState<string>('');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setTimeout(() => setActiveLink(''), 1000); // Remove blink effect after 1 second
  };

  return (
    <div id="nav-bar">
      <nav className='nav-header'>
        {['home', 'about', 'games', 'resume', 'contact'].map((page, index) => (
          <>
            <Link href={`/${page === 'home' ? '' : page}`} key={page}
                className={`nav-link ${activeLink === page ? 'blink' : ''}`}
                onClick={() => handleLinkClick(page)}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
            </Link>
            {index !== ['home', 'about', 'games', 'resume', 'contact'].length - 1 && <p className="nav-slash">|</p>}
          </>
        ))}
      </nav>
    </div>
  );
}

export default Header;
