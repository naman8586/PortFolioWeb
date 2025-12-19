"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Github, Linkedin, ArrowDown, FileText } from "lucide-react";

export default function Hero() {
  const { scrollY } = useScroll();

  // 🔥 Smooth parallax system (from Hero A)
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.25 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/2 blur-[120px]" />

      <motion.div
        style={{ opacity, y, scale }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400 backdrop-blur-md">
            B.Tech IT <span className="mx-1 text-white/10">•</span> 2026 Grad
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="bg-linear-to-b from-white via-white to-white/20 bg-clip-text text-6xl font-extrabold tracking-tighter text-transparent leading-[1.1] md:text-8xl lg:text-9xl"
        >
          Naman Soni
        </motion.h1>

        {/* Role */}
        <motion.h2
          variants={itemVariants}
          className="mt-6 text-base font-medium uppercase tracking-[0.2em] text-zinc-400 md:text-xl"
        >
          Full-Stack Developer <span className="mx-1 text-white/10">&</span>{" "}
          Automation
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed text-zinc-400 md:text-lg"
        >
          Building high-performance digital experiences and intelligent
          automation. Currently focused on scaling{" "}
          <span className="text-white">full-stack architectures</span> and
          exploring the intersection of{" "}
          <span className="text-white">efficiency and design</span>.
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          {/* Contact */}
          <div className="group relative overflow-hidden rounded-full p-px">
            <div className="absolute inset-0 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#ffffff_100%)] opacity-0 transition-opacity group-hover:opacity-100" />
            <motion.a
              whileTap={{ scale: 0.97 }}
              onClick={scrollToContact}
              href="#contact"
              className="relative z-10 flex items-center gap-3 rounded-full bg-white px-8 py-3.5 text-xs font-bold text-black transition-all hover:bg-zinc-100"
            >
              <Mail size={16} />
              Contact Me
            </motion.a>
          </div>

          {/* Resume */}
          <div className="group relative overflow-hidden rounded-full p-px">
            <div className="absolute inset-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,#52525b_100%)] opacity-0 transition-opacity group-hover:opacity-100" />
            <motion.a
              whileTap={{ scale: 0.97 }}
              href="/resume.pdf"
              download="Naman_Soni_Resume.pdf"
              className="relative z-10 flex items-center gap-3 rounded-full border border-white/10 bg-[#0a0a0a] px-8 py-3.5 text-xs font-bold text-white backdrop-blur-sm transition-all group-hover:border-transparent"
            >
              <FileText size={16} className="text-zinc-400" />
              Download CV
            </motion.a>
          </div>

          {/* Socials */}
          <div className="ml-0 flex gap-3 sm:ml-2">
            {[
              { icon: <Github size={19} />, href: "https://github.com/naman8586" },
              {
                icon: <Linkedin size={19} />,
                href: "https://www.linkedin.com/in/naman-soni-6977952b1/",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                whileHover={{
                  y: -3,
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-all hover:text-white"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute left-1/2 top-160 flex -translate-x-1/2 flex-col items-center gap-4"
      >
        <span className="ml-1 text-[8px] font-bold uppercase tracking-[0.6em] text-zinc-600">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-12 w-px items-end justify-center bg-linear-to-b from-zinc-500 to-transparent"
        >
          <ArrowDown size={12} className="translate-y-3 text-zinc-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
