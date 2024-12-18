"use client";
import React from "react";
import { FiArrowRight, FiSearch, FiCode, FiCpu, FiGlobe, FiServer } from "react-icons/fi";
import FloatingCard from "./FloatingCard";
import GradientButton from "@components/common/buttons/GRadientButton";
import TransparentButton from "@components/common/buttons/TransparentButton";

const HomeHero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0D1117]">
      <div className="absolute inset-0">
        <div className="animate-slow-spin absolute left-0 top-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-50">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-100 to-emerald-500 blur-[10px]" />
        </div>
        <div className="animate-slow-spin-reverse absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 opacity-50">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-50 blur-[5px]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-20">
        <div className="mt-24 flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 blur-xl" />
            <div className="absolute -right-4 -top-4 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-xl" />
            <h1 className="relative text-5xl font-bold tracking-tight text-white md:text-7xl">
              Where Ideas
              <span className="relative mx-4 whitespace-nowrap bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Come to Life</span>
            </h1>
          </div>
          <p className="text-gray-400 mt-6 max-w-2xl text-lg">
            Your platform to showcase innovative projects, connect with fellow creators, and build something extraordinary together.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <GradientButton>
              Start Creating
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </GradientButton>
            <TransparentButton>
              <FiSearch />
              Explore Projects
            </TransparentButton>
          </div>

          <div className="relative mt-20 h-[400px] w-full max-w-4xl">
            <div className="absolute inset-x-0 mx-auto h-[300px] w-[80%] rounded-2xl bg-[#161B22]/50 p-1 ring-1 ring-white/10 backdrop-blur-sm">
              <div className="h-full w-full rounded-xl bg-[#1C2128]/50 p-4">
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-2 animate-pulse rounded-full bg-gradient-to-r from-teal-500/20 to-transparent"
                      style={{
                        width: `${Math.random() * 40 + 60}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <FloatingCard
              icon={FiCode}
              title="Web Development"
              className="animate-float left-0 top-0"
              i={0.5}
            />
            <FloatingCard
              icon={FiCpu}
              title="AI/ML Projects"
              className="animate-float right-0 top-1/4"
              i={1}
            />
            <FloatingCard
              icon={FiServer}
              title="Backend Systems"
              className="animate-float bottom-0 left-1/4"
              i={1.5}
            />
            <FloatingCard
              icon={FiGlobe}
              title="Open Source"
              className="animate-float bottom-1/4 right-1/4"
              i={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
