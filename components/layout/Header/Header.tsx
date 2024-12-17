import React from 'react';
import Logo from './Logo';
import AccountActions from './AccountActions/AccountActions';
import HamburgerMenu from './HmaburgerMenu/HamburgerMenu';
import DesktopMenu from './DesktopMenu';

const Header = () => {
  return (
    <nav className="nav sticky left-0 right-0 top-0 z-50 flex w-full items-center justify-between border-b border-[#21262D] bg-[#0D1117]/80 p-2 backdrop-blur-xl">
      <Logo />
      <div className="menu-wrapper items-center md:flex md:flex-row">
        <HamburgerMenu />
        <DesktopMenu />
        <AccountActions />
      </div>
    </nav>
  );
};

export default Header;
