'use client';

import { useEffect, useState } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '16px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.3)',
        transition: 'background 0.3s'
      }}
    >
      <div
        className="display-font"
        style={{
          fontSize: '1.6rem',
          fontWeight: 600,
          color: 'var(--text-main)',
          letterSpacing: '-0.02em'
        }}
      >
        Emoti<span style={{ color: '#9b6fd4' }}>IQ</span>
      </div>

      <ul
        className="nav-links"
        style={{
          display: 'flex',
          gap: '32px',
          listStyle: 'none',
          alignItems: 'center'
        }}
      >
        <li><a href="#how">How It Works</a></li>
        <li><a href="#shop">Shop</a></li>
        <li><a href="#personalise">Personalise</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li>
          <a href="#personalise" className="nav-cta">Get Started</a>
        </li>
      </ul>

      <a href="#personalise" className="nav-mobile-cta nav-cta">Get Started</a>

      <style jsx>{`
        .nav-links a {
          text-decoration: none;
          color: var(--text-light);
          font-size: 0.9rem;
          font-weight: 400;
          transition: color 0.2s;
          letter-spacing: 0.01em;
        }
        .nav-links a:hover {
          color: var(--text-main);
        }
        .nav-cta {
          background: rgba(155,111,212,0.85);
          color: white !important;
          padding: 10px 22px;
          border-radius: 50px;
          font-weight: 500 !important;
          backdrop-filter: blur(8px);
          transition: background 0.2s, transform 0.15s !important;
          font-size: 0.88rem !important;
          text-decoration: none;
        }
        .nav-cta:hover {
          background: rgba(155,111,212,1) !important;
          transform: translateY(-1px);
        }
        .nav-mobile-cta {
          display: none;
        }
        @media (max-width: 900px) {
          nav {
            padding: 14px 20px !important;
          }
          .nav-links {
            display: none !important;
          }
          .nav-mobile-cta {
            display: inline-flex;
          }
        }
        @media (max-width: 600px) {
          nav {
            padding: 12px 16px !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;


