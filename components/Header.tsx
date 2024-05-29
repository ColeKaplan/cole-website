'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import './Header.css';

function Header() {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState<string>(router.pathname.substring(1) || 'home');

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const page = url.substring(1) || 'home';
      setActiveLink(page);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div id="nav-bar">
      <nav className='nav-header'>
        {['home', 'about', 'games', 'resume', 'contact'].map((page, index) => (
          <React.Fragment key={page}>
            <Link 
              href={`/${page === 'home' ? '' : page}`}
              className={`nav-link ${activeLink === page ? 'currentPage' : ''}`}
              onClick={() => handleLinkClick(page)}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </Link>
            {index !== 4 && (
              <p className="nav-slash" key={`separator-${index}`}>|</p>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}

export default Header;
