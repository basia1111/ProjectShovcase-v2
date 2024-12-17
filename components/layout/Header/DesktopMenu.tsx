import React from 'react';
import Link from 'next/link';

const DesktopMenu = () => {
  return (
    <ul className="menu-links-wrapper relative mr-8 hidden h-auto w-auto flex-row items-center justify-center gap-10 bg-transparent p-4 text-base font-light text-white/90 lg:flex">
      <li className="menu-link text-3xl font-normal transition-colors hover:text-white/70 lg:text-base">
        <Link href="/">Home</Link>
      </li>
      <li className="menu-link text-3xl font-normal transition-colors hover:text-white/70 lg:text-base">
        <Link href="/explore">Explore</Link>
      </li>
    </ul>
  );
};

export default DesktopMenu;
