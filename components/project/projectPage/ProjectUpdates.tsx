import React from "react";

const ProjectUpdates = () => {
  return (
    <div className="overflow-hidden rounded-xl bg-[#161B22] ring-1 ring-white/10">
      <div className="flex items-center justify-between border-b border-white/10 p-6">
        <h2 className="text-xl font-semibold text-white">Latest Updates</h2>
        <span className="rounded-full bg-teal-500/10 px-2.5 py-0.5 text-sm font-medium text-teal-500">2 updates</span>
      </div>
      <div className="grid gap-px bg-white/5">
        {[
          {
            date: "Dec 15, 2024",
            title: "Version 2.0 Released",
            description: "Major update with new features and improvements.",
          },
          {
            date: "Dec 10, 2024",
            title: "Beta Testing Started",
            description: "Opened beta testing for selected users.",
          },
        ].map((update, index) => (
          <div
            key={index}
            className="group bg-[#161B22] p-6 transition-colors hover:bg-[#1C2128]"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium text-white group-hover:text-teal-500">{update.title}</h3>
              <span className="text-sm text-gray-400">{update.date}</span>
            </div>
            <p className="text-sm text-gray-400">{update.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectUpdates;
