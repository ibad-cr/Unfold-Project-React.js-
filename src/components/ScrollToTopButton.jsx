import React, { useState, useEffect } from 'react';
import { BsArrowUpShort } from 'react-icons/bs';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollTop = () => {
    if (window.scrollY > window.innerHeight / 2) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const buttonStyle = {
    width: '40px',
    height: '40px',
    border: 'none',
    borderRadius: '50%',
    backgroundColor: '#b3b2fb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    transition: 'opacity 0.3s ease, background-color 0.3s ease',
    position: 'fixed',
    bottom: '50px',
    right: '20px',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#9e9eeb',
  };

  return (
    <div style={{ display: isVisible ? 'block' : 'none' }}>
      <button
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#9e9eeb')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#b3b2fb')}
        onClick={scrollToTop}
      >
        <BsArrowUpShort />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
