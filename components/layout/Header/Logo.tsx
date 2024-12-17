import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="logo flex items-center gap-2">
      <p className="logo-txt font-Syne p-2 text-xl font-bold text-white transition-colors hover:text-white/80 lg:p-4">
        ProjectShowcase
      </p>
    </Link>
  );
};

export default Logo;
