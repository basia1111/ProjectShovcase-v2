"use client";

import React from "react";
import { FiGithub, FiMail, FiLinkedin, FiExternalLink } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Project Info",
      links: [
        {
          label: "About This Project",
          href: "https://github.com/basia1111/Startup-Toolkit?tab=readme-ov-file#readme",
        },
        { label: "Source Code", href: "https://github.com/basia1111/Startup-Toolkit" },
      ],
    },
    {
      title: "Features",
      links: [
        { label: "Browse projects", href: "/explore" },
        { label: "Create project", href: "/my-profile" },
        { label: "Profile", href: "/my-profile" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: FiGithub,
      href: "https://github.com/basia1111",
      label: "GitHub",
    },
    {
      icon: FiMail,
      href: "mailto:basia.zygilewicz@gmail.com",
      label: "Email",
    },
    {
      icon: FiLinkedin,
      href: "https://linkedin.com/in/barbara-żygilewicz-905635332",
      label: "LinkedIn",
    },
  ];

  const techStack = ["React", "Next.js", "Tailwind CSS", "TypeScript", "FramerMotion"];

  return (
    <footer className="z-40 w-full bg-[#0f151c] pt-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-start">
          <div className="space-y-4 md:w-1/4">
            <h2 className="text-xl font-bold text-white">ProjectShowcase</h2>
            <p className="text-gray-400 text-sm">
              A full-stack demonstration project showcasing my development skills through a platform where developers can share and discover projects.
            </p>
            <div className="flex justify-center space-x-4 md:justify-start">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-400 transition-colors hover:text-teal-400"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex w-2/4 flex-col justify-end gap-8 md:flex-row">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">{section.title}</h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-400 inline-flex items-center gap-1 text-sm transition-colors hover:text-teal-400"
                      >
                        {link.label}
                        {link.href.startsWith("http") && <FiExternalLink className="h-3 w-3" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <h3 className="text-gray-400 mb-4 text-sm font-semibold uppercase tracking-wider">Built With</h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="text-gray-400 rounded-full bg-white/5 px-3 py-1 text-sm ring-1 ring-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-gray-400 text-sm">© {currentYear} ProjectShowCase • For Demonstration Purposes</p>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400" />
              <span className="text-gray-400 text-sm">Built by Brabara Żygilewicz</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
