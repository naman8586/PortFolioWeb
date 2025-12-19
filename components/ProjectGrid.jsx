"use client";
import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Github,
  X,
  ExternalLink,
  Sparkles,
  Orbit,
  Binary,
  Cpu,
  Boxes,
  Zap,
  Shield,
} from "lucide-react";

/* ---------------- DATA ---------------- */

const projects = [
  {
    id: 1,
    title: "NamasteNomad",
    desc: "Full-stack travel platform for exploration.",
    longDesc:
      "Designed to simplify trip planning in India with hotel discovery, booking flows, and location-based exploration.",
    link: "https://github.com/naman8586/tourism_project",
    tags: ["React", "Node.js", "Express"],
    className: "md:col-span-2 md:row-span-2 min-h-[400px]",
    icon: (
      <Orbit
        size={40}
        className="text-zinc-500 transition-all duration-1000 group-hover:rotate-180"
      />
    ),
  },
  {
    id: 2,
    title: "Shopinsta",
    desc: "E-commerce Redux frontend.",
    longDesc:
      "Implements scalable product listings, cart persistence, and optimized UI performance using Redux Toolkit.",
    link: "https://github.com/naman8586/Shopinsta",
    tags: ["React", "Redux", "Tailwind"],
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    icon: <Binary size={28} className="text-zinc-600 group-hover:text-white" />,
  },
  {
    id: 3,
    title: "Scrapperly",
    desc: "Python scraping system.",
    longDesc:
      "Automates product data extraction using Selenium with bot-evasion techniques and structured outputs.",
    link: "https://github.com/naman8586/Scrapperly",
    tags: ["Python", "Selenium", "Next.js"],
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    icon: <Cpu size={28} className="text-zinc-600 group-hover:text-white" />,
  },
  {
    id: 4,
    title: "TaskHub",
    desc: "Secure task management.",
    longDesc:
      "Built with Prisma ORM to manage relational data between users and tasks with role-based access control.",
    link: "https://github.com/naman8586/TaskHub",
    tags: ["TypeScript", "Prisma", "Postgres"],
    className: "md:col-span-1 md:row-span-2 min-h-[400px]",
    icon: (
      <Sparkles size={32} className="text-zinc-600 group-hover:text-white" />
    ),
  },
  {
    id: 5,
    title: "AI Resume",
    desc: "ATS LLM generation.",
    longDesc:
      "Uses LLMs to generate role-specific resumes and analyze ATS compatibility signals.",
    link: "#",
    tags: ["AI", "NLP", "Next.js"],
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    icon: <Boxes size={28} className="text-zinc-800" />,
    isWIP: true,
  },
  {
    id: 6,
    title: "Commerce Engine",
    desc: "Scalable payment system.",
    longDesc:
      "End-to-end e-commerce solution featuring authentication, order processing, and Stripe integration.",
    link: "#",
    tags: ["Node.js", "Stripe", "PostgreSQL"],
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    icon: <Zap size={28} className="text-zinc-800" />,
    isWIP: true,
  },
  {
    id: 7,
    title: "Outbreak Detector",
    desc: "Early signal mining.",
    longDesc:
      "Analyzes social media data to detect early outbreak signals using NLP and trend analysis.",
    link: "#",
    tags: ["ML", "NLP", "Data Mining"],
    className: "md:col-span-2 md:row-span-1 min-h-[200px]",
    icon: <Shield size={28} className="text-zinc-800" />,
    isWIP: true,
  },
];

/* ---------------- CARD ---------------- */

function ProjectCard({ project, setSelectedProject }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={() => setSelectedProject(project)}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${project.className} group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#050505] p-8 transition-all duration-500 hover:border-white/10`}
    >
      {/* Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 flex justify-between">
        <div className="rounded-2xl border border-white/5 bg-white/2 p-3">
          {project.icon}
        </div>
        {project.isWIP ? (
          <span className="pt-2 text-[8px] font-black uppercase tracking-widest text-zinc-700">
            Phase: Dev
          </span>
        ) : (
          <ExternalLink
            size={16}
            className="text-zinc-600 transition-colors group-hover:text-white"
          />
        )}
      </div>

      <div className="relative z-10 mt-6">
        <motion.h3
          layoutId={`title-${project.id}`}
          className="mb-2 text-2xl font-bold tracking-tight text-white"
        >
          {project.title}
        </motion.h3>
        <p className="line-clamp-2 text-sm font-light text-zinc-500 transition-colors group-hover:text-zinc-400">
          {project.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ---------------- GRID ---------------- */

export default function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useRef(null);

  /* 🔥 Section-level parallax (synced with Education & Experience) */
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

  return (
    <motion.section
      ref={ref}
      id="projects"
      style={{ opacity, y, scale }}
      className="relative mx-auto max-w-7xl py-32 px-6"
    >
      {/* Heading */}
      <div className="mb-24">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white uppercase opacity-90 leading-none">
          Projects<span className="font-light italic text-zinc-800">.</span>
        </h2>
        <p className="ml-2 mt-6 text-[10px] font-bold uppercase tracking-[0.8em] text-zinc-600">
          Project Inventory 2025
        </p>
      </div>

      {/* Grid */}
      <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            setSelectedProject={setSelectedProject}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-100 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              layoutId={`card-${selectedProject.id}`}
              className="fixed inset-4 z-101 m-auto max-w-3xl overflow-hidden rounded-[3rem] border border-white/10 bg-[#050505] p-8 shadow-2xl md:p-16"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-8 top-8 p-2 text-zinc-500 hover:text-white"
              >
                <X size={24} />
              </button>

              <div className="space-y-12">
                <motion.h2
                  layoutId={`title-${selectedProject.id}`}
                  className="text-5xl md:text-6xl font-bold tracking-tighter text-white"
                >
                  {selectedProject.title}
                </motion.h2>

                <div className="grid gap-12 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                      Objective
                    </h4>
                    <p className="text-lg font-light leading-relaxed text-zinc-400">
                      {selectedProject.longDesc}
                    </p>

                    {!selectedProject.isWIP && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-black transition-all hover:bg-zinc-200"
                      >
                        <Github size={16} /> Access Code
                      </a>
                    )}
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                      Core Systems
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {selectedProject.isWIP && (
                      <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/50 p-4">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                          Status: Under architectural review
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
