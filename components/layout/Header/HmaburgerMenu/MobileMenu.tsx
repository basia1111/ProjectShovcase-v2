import React from "react";
import { signOut, useSession } from "next-auth/react";

import { motion, AnimatePresence } from "framer-motion";
import { IoLogOutSharp } from "react-icons/io5";

type MobileMenuProps = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsExiting: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
  isExiting: boolean;
};

const MobileMenu = ({ isMenuOpen, isExiting, setIsMenuOpen, setIsExiting }: MobileMenuProps) => {
  const { data: session } = useSession();

  const handleClick = () => {
    setIsExiting(false);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const menuWrapperVariants = {
    initial: {
      opacity: 0,
      height: 0,
      clipPath: "inset(0% 0% 100% 0%)",
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        ease: "easeInOut",
      },
    },
    animate: {
      opacity: 1,
      height: "100vh",
      clipPath: "inset(0% 0 0 0)",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      clipPath: "inset(0% 0% 100% 0%)",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
  };

  const menuLinksVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          variants={menuWrapperVariants}
          initial="initial"
          animate="animate"
          exit={isExiting ? "exit" : ""}
          className="fixed inset-0 z-40 flex bg-[#0D1117]/95 backdrop-blur-md"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-0 top-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 opacity-20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 blur-[80px]" />
            </div>
            <div className="a absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 opacity-20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 blur-[80px]" />
            </div>
          </div>

          <motion.ul className="relative flex w-full flex-col gap-8 p-6 pt-32">
            <motion.li
              variants={menuLinksVariants}
              className="text-3xl font-light text-white transition-all duration-300 hover:text-teal-400"
              onClick={handleClick}
            >
              <a href="/">Home</a>
            </motion.li>
            <motion.li
              variants={menuLinksVariants}
              className="text-3xl font-light text-white transition-all duration-300 hover:text-teal-400"
              onClick={handleClick}
            >
              <a href="/explore">Explore</a>
            </motion.li>

            <motion.div
              variants={menuLinksVariants}
              className="absolute bottom-8 left-6 right-6 flex flex-col items-center justify-center border-t border-white/10 pt-6"
            >
              {session?.user?.name ? (
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="/my-profile"
                    className="flex items-center gap-4 text-white transition-all duration-300 hover:text-teal-400"
                    onClick={handleClick}
                  >
                    <img
                      src={session.user.image || "/images/avatar-placeholder.png"}
                      alt="profile picture"
                      width={30}
                      height={30}
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-white/10"
                    />
                    <span className="text-lg font-medium">{session.user.name}</span>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-white/5 p-2 text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10 hover:text-teal-400"
                  >
                    <IoLogOutSharp size={20} />
                  </button>
                </div>
              ) : (
                <a
                  href="/login"
                  className="w-full max-w-xs rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-2 text-center text-white transition-all duration-300 hover:from-teal-500 hover:to-emerald-500"
                  onClick={handleClick}
                >
                  Sign in
                </a>
              )}
            </motion.div>
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
