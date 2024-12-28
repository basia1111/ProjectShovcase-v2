import React from "react";
import { FiCalendar, FiUsers, FiMap, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";

type Event = {
  day: string;
  month: string;
  title: string;
  description: string;
  time: string;
  attendees: string;
  location: string;
  tags: string[];
};
type EventProps = {
  event: Event;
  isActive: boolean;
  onClick: () => void;
};

const Event = ({ event, isActive, onClick }: EventProps) => {
  const eventDataVariants = {
    initial: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const childVariants = {
    initial: {
      opacity: 0,
      y: 15,
      scale: 0.99,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        opacity: { duration: 0.35 },
        scale: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 1, 1],
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    },
  };

  return (
    <div
      className={`relative flex cursor-pointer transition-all duration-500 ${isActive ? "opacity-100" : "opacity-50 hover:opacity-75"}`}
      onClick={onClick}
    >
      <div className="absolute left-[20px] top-0 h-full w-px bg-white/10" />

      <div
        className={`relative z-10 mt-8 md:h-14 md:w-14 h-10 w-10 shrink-0 rounded-full bg-gradient-to-r p-[2px] transition-all duration-300 ${
          isActive ? "rotate-0 scale-110 from-teal-400 to-emerald-400" : "rotate-12 from-teal-400/20 to-emerald-400/20"
        }`}
      >
        <div className={`flex h-full w-full items-center justify-center rounded-full bg-[#0D1117]`}>
          <span className="text-sm font-bold text-white">{event.day}</span>
        </div>
      </div>

      <div className={`md:ml-8 ml-2 transition-all duration-300 ${isActive ? "pl-3" : ""}`}>
        <div className="mt-6 flex items-center gap-2 text-sm text-teal-400">
          <FiCalendar className="h-4 w-4" />
          {event.month}
        </div>
        <h3 className="mt-2 text-xl font-bold text-white">{event.title}</h3>
        {isActive && (
          <motion.div
            variants={eventDataVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="transition-all duration-500"
          >
            <motion.p
              variants={childVariants}
              className="text-gray-400"
            >
              {event.description}
            </motion.p>

            <motion.div
              variants={childVariants}
              className="text-gray-400 mt-4 flex flex-wrap gap-4 text-sm"
            >
              <div className="flex items-center gap-1">
                <FiClock className="h-4 w-4" />
                {event.time}
              </div>
              <div className="flex items-center gap-1">
                <FiUsers className="h-4 w-4" />
                {event.attendees} attending
              </div>
              <div className="flex items-center gap-1">
                <FiMap className="h-4 w-4" />
                {event.location}
              </div>
            </motion.div>

            <motion.div
              variants={childVariants}
              className="mt-4 flex flex-wrap gap-2"
            >
              {event.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gradient-to-r from-teal-500/10 to-emerald-500/10 px-3 py-1 text-sm text-teal-400 ring-1 ring-teal-500/20"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Event;
