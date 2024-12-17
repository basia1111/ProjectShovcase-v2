'use client';

import React, { useState } from 'react';
import MenuToggle from './MenuToggle';
import MobileMenu from './MobileMenu';

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  return (
    <div className="menu-wrapper items-center md:flex md:flex-row">
      <MenuToggle
        setIsExiting={setIsExiting}
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
      />
      <MobileMenu
        isExiting={isExiting}
        isMenuOpen={isMenuOpen}
        setIsExiting={setIsExiting}
        setIsMenuOpen={setIsMenuOpen}
      />
    </div>
  );
};

export default HamburgerMenu;
