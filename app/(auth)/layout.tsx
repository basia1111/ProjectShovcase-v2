import React, { ReactNode } from 'react';

type RootProps = {
  children: ReactNode;
};

const Layout = ({ children }: RootProps) => {
  return (
    <main className="-mt-20 min-h-screen w-full bg-[#0D1117] pt-20">
      <div className="fixed inset-0 overflow-hidden">
        <div className="animate-float absolute left-[15%] top-[20%] h-[300px] w-[300px] rounded-full bg-gradient-to-br from-teal-100/70 to-emerald-600/50 blur-[10px]" />

        <div
          style={{ animationDelay: '1s' }}
          className="animate-float absolute right-[20%] top-[30%] h-[200px] w-[200px] rounded-full bg-gradient-to-r from-teal-200/80 to-teal-500/30 blur-[5px]"
        />

        <div
          style={{ animationDelay: '2s' }}
          className="animate-float absolute bottom-[20%] left-[40%] h-[250px] w-[250px] rounded-full bg-gradient-to-tr from-emerald-400/80 to-teal-100/70 blur-[10px]"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative flex min-h-screen w-full items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-[#161B22]/30 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur-md md:p-14">
            {children}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">Join the community of innovative developers</p>
            <div className="mt-4 flex justify-center space-x-4">
              <div className="h-2 w-2 animate-pulse rounded-full bg-teal-500/40" />
              <div
                className="h-2 w-2 animate-pulse rounded-full bg-teal-500/40"
                style={{ animationDelay: '0.2s' }}
              />
              <div
                className="h-2 w-2 animate-pulse rounded-full bg-teal-500/40"
                style={{ animationDelay: '0.4s' }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
