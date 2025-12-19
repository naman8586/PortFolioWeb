"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Experience() {
  const ref = useRef(null);

  /* 🔥 Section-level parallax synced with scroll */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.98]);

  const jobs = [
    {
      company: "Brancosoft",
      role: "Frontend Developer",
      date: "Apr 2025 - July 2025",
    },
    {
      company: "SkillCraft Technology",
      role: "Web Developer Intern",
      date: "Aug 2024 - Oct 2024",
    },
  ];

  const skillCategories = [
    {
      title: "Languages",
      items: ["Javascript", "Python", "Java", "C", "HTML", "CSS", "Typescript"],
    },
    {
      title: "Frameworks & Tools",
      items: [
        "React.js",
        "Redux",
        "Node.js",
        "Express.js",
        "Flask",
        "Postman",
        "Selenium",
        "TailwindCSS",
      ],
    },
    {
      title: "Databases",
      items: ["MongoDB", "SQL", "PostgreSQL"],
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.section
      ref={ref}
      id="experience"
      style={{ opacity, y, scale }}
      className="relative mx-auto max-w-6xl bg-transparent py-32 px-6"
    >
      {/* Divider */}
      <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
        {/* Experience Column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              Experience
            </h2>
            <div className="mt-4 h-1 w-12 rounded-full bg-white" />
          </div>

          <div className="space-y-16">
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeIn}
                className="group relative pl-10"
              >
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800 transition-colors group-hover:bg-zinc-400" />

                {/* Node */}
                <div className="absolute top-2 -left-1 h-2 w-2 rounded-full bg-zinc-700 transition-all group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]" />

                <div className="space-y-2">
                  <h4 className="text-2xl font-medium tracking-tight text-white transition-transform group-hover:translate-x-1">
                    {job.role}
                  </h4>
                  <p className="text-lg font-light italic text-zinc-500">
                    {job.company}
                  </p>
                  <p className="pt-2 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                    {job.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              Stack
            </h2>
            <div className="mt-4 h-1 w-12 rounded-full bg-white" />
          </div>

          <div className="space-y-12">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="space-y-6">
                <h5 className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.5em] text-zinc-600">
                  {cat.title}
                  <div className="h-px flex-1 bg-zinc-900" />
                </h5>

                <div className="flex flex-wrap gap-3">
                  {cat.items.map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="group relative overflow-hidden rounded-xl p-px"
                    >
                      <div className="absolute inset-0 animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,#ffffff_100%)] opacity-0 transition-opacity group-hover:opacity-100" />

                      <span className="relative block rounded-xl border border-white/5 bg-white/3 px-5 py-2 text-[11px] font-medium tracking-wider text-zinc-400 backdrop-blur-md transition-all group-hover:bg-white/5 group-hover:text-white">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </motion.section>
  );
}
