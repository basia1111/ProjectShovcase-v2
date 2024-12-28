import React from "react";

const DesktopMenu = () => {
  return (
    <ul className="menu-links-wrapper relative mr-8 hidden h-auto w-auto flex-row items-center justify-center gap-10 bg-transparent p-4 text-base font-light text-white/90 lg:flex">
      <li className="menu-link text-3xl font-normal transition-colors hover:text-white/70 lg:text-base">
        <a href="/">Home</a>
      </li>
      <li className="menu-link text-3xl font-normal transition-colors hover:text-white/70 lg:text-base">
        <a href="/explore">Explore</a>
      </li>
    </ul>
  );
};

export default DesktopMenu;
