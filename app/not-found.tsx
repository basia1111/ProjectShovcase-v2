import { FiHome, FiSearch } from "react-icons/fi";
import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative -mt-20 flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0D1117] pt-20">
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="relative p-4">
          <div className="absolute inset-0 left-2 top-2 opacity-50 blur-sm">
            <h1 className="bg-gradient-to-r from-teal-50 to-emerald-600 bg-clip-text text-[105px] font-bold leading-none text-transparent">404</h1>
          </div>
          <h1 className="text-[100px] font-bold leading-none text-white drop-shadow-lg filter">
            <span className="animate-float relative inline-block">4</span>
            <span
              className="animate-float relative inline-block"
              style={{ animationDelay: "0.2s" }}
            >
              0
            </span>
            <span
              className="animate-float relative inline-block"
              style={{ animationDelay: "0.4s" }}
            >
              4
            </span>
          </h1>
        </div>

        <h2 className="mt-8 text-2xl font-bold text-white md:text-3xl">Page Not Found</h2>
        <p className="md:text-gray-400 text-gray-300 mt-4 text-sm md:max-w-lg md:text-lg">
          Looks like you&apos;ve ventured into uncharted territory. The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="flex items-center rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-2 text-white hover:from-teal-500 hover:to-emerald-500"
          >
            <FiHome className="mr-2" />
            Back to Home
          </Link>
          <a
            href="/explore"
            className="flex items-center rounded-lg bg-white/5 px-4 py-2 text-white ring-1 ring-white/10 hover:bg-white/10"
          >
            <FiSearch className="mr-2" />
            Explore Projects
          </a>
        </div>

        <div className="absolute left-1/4 top-1/2 h-2 w-2 animate-pulse rounded-full bg-teal-200 blur-sm" />
        <div
          className="absolute bottom-1/3 right-1/4 h-2 w-2 animate-pulse rounded-full bg-emerald-600 blur-sm"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute right-1/3 top-1/3 h-2 w-2 animate-pulse rounded-full bg-teal-400 blur-sm"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  );
}
