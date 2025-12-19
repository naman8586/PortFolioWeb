"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ Effect ONLY subscribes to external system (scroll)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      {/* ───────── Desktop Navbar ───────── */}
      <nav className="fixed top-8 left-1/2 z-50 hidden -translate-x-1/2 md:block">
        <motion.div
          initial={{ y: -50, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          className={`flex items-center gap-2 rounded-full border px-2 py-2 backdrop-blur-2xl transition-all duration-700 ${
            scrolled
              ? "border-white/20 bg-black/40 shadow-[0_0_30px_rgba(0,0,0,0.5)] scale-95"
              : "border-white/10 bg-white/5"
          }`}
          style={{ position: "fixed", left: "50%" }}
        >
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[10px] font-black tracking-tighter text-black transition-transform hover:scale-110"
          >
            NS
          </button>

          <div className="flex items-center gap-2 pr-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={item.name === "Home" ? scrollToTop : undefined}
                className="group relative px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 transition-all duration-300 hover:text-white"
              >
                {item.name}
                <span className="absolute bottom-1 left-4 right-4 h-px origin-center scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* ───────── Mobile Navbar ───────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div
          className={`flex items-center justify-between px-8 py-6 transition-all duration-500 ${
            scrolled || isOpen
              ? "border-b border-white/5 bg-black/80 backdrop-blur-2xl"
              : "bg-transparent"
          }`}
        >
          <button
            onClick={scrollToTop}
            className="text-sm font-black tracking-tighter text-white"
          >
            NV.
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-8 w-8 items-center justify-center text-white"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  exit={{ y: -20 }}
                >
                  <X size={20} strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  exit={{ y: -20 }}
                >
                  <Menu size={20} strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[-1] flex h-screen flex-col justify-center bg-black/95 px-12 backdrop-blur-3xl"
            >
              <div className="space-y-8">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-4xl font-bold text-zinc-600 transition-colors hover:text-white"
                    >
                      {item.name}
                      <span className="ml-2 opacity-0 transition-opacity hover:opacity-100">
                        .
                      </span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
