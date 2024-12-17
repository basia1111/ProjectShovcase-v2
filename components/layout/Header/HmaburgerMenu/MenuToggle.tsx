'use client';

import React from 'react';
import { motion } from 'framer-motion';

type MenuToggleProps = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsExiting: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
};

const MenuToggle = ({ setIsMenuOpen, setIsExiting, isMenuOpen }: MenuToggleProps) => {
  const handleClick = () => {
    setIsExiting(true);
    setIsMenuOpen((menu) => !menu);
  };

  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 10,
    },
  };
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -11,
    },
  };

  return (
    <div
      onClick={handleClick}
      className="menu-toggle fixed right-4 top-4 z-50 flex h-10 w-10 cursor-pointer flex-col items-end justify-around gap-2 p-2 lg:hidden"
    >
      <motion.div
        variants={top}
        animate={isMenuOpen ? 'opened' : 'closed'}
        className="bar h-[2px] w-7 bg-white"
      />
      <motion.div
        variants={center}
        animate={isMenuOpen ? 'opened' : 'initial'}
        className="bar h-[2px] w-7 bg-white"
      />
      <motion.div
        variants={bottom}
        animate={isMenuOpen ? 'opened' : 'closed'}
        className="bar h-[2px] w-7 bg-white"
      />
    </div>
  );
};

export default MenuToggle;
