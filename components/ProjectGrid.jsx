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

/* ---------------- DATA ---------------- */

const projects = [
  {
    id: 1,
    title: "GitIntel",
    desc: "Real-time GitHub Analytics Platform.",
    longDesc:
      "A high-performance analytics platform using webhooks to track PRs, reviews, and commits. Features asynchronous pipelines built with Node.js, BullMQ, and Redis to process high-throughput event bursts without data loss.",
    link: "https://github.com/naman8586/gitIntel",
    tags: ["Node.js", "BullMQ", "Redis", "Prisma", "PostgreSQL"],
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
    title: "Scrapperly",
    desc: "Full-Stack Web Scraping Engine.",
    longDesc:
      "Advanced extraction system for JS-heavy websites using Python and Next.js. Implements resilient mechanisms like rotating user agents and request throttling to bypass anti-bot protections with automated background export jobs.",
    link: "https://github.com/naman8586/Scrapperly",
    tags: ["Next.js", "Python", "Selenium", "Async-Jobs"],
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    icon: <Cpu size={28} className="text-zinc-600 group-hover:text-white" />,
  },
  {
    id: 3,
    title: "OutbreakAi",
    desc: "Early Disease Outbreak Detection.",
    longDesc:
      "A surveillance tool that mines social media (Twitter/Facebook) using ML to detect early health crisis signals, addressing the reporting lag inherent in traditional clinical systems for faster public health response.",
    link: "https://github.com/naman8586/OutbreakAi",
    tags: ["ML", "NLP", "Social Mining", "Data Science"],
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    icon: <Shield size={28} className="text-zinc-600 group-hover:text-white" />,
  },
  {
    id: 4,
    title: "Zappy",
    desc: "Vendor Event Day Tracker.",
    longDesc:
      "Operational accountability system for vendor workflows. Architected with Node.js and MongoDB to support real-time progress tracking, including pre/post-setup photo verification and completion status updates.",
    link: "https://github.com/naman8586/Zeppy",
    tags: ["Node.js", "MongoDB", "Workflow", "Scalable-Arch"],
    className: "md:col-span-1 md:row-span-2 min-h-[400px]",
    icon: (
      <Sparkles size={32} className="text-zinc-600 group-hover:text-white" />
    ),
  },
  {
    id: 5,
    title: "Places Review API",
    desc: "Django REST Location Intelligence.",
    longDesc:
      "A robust Django 4.2 API featuring phone-based authentication and PostgreSQL persistence. Optimized for mobile apps with auto-place creation, token-auth, and advanced search filtering by rating.",
    link: "https://github.com/naman8586/django_api",
    tags: ["Django", "DRF", "PostgreSQL", "REST-API"],
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    icon: <Binary size={28} className="text-zinc-600 group-hover:text-white" />,
  },
  {
    id: 6,
    title: "TaskHub",
    desc: "Secure Collaborative Management.",
    longDesc:
      "Centralized task management hub using Prisma ORM to manage complex relational data. Focuses on real-time updates and role-based access control for team-wide project orchestration.",
    link: "https://github.com/naman8586/TaskHub",
    tags: ["TypeScript", "Next.js", "Prisma", "Postgres"],
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    icon: <Boxes size={28} className="text-zinc-600 group-hover:text-white" />,
  },
  {
    id: 7,
    title: "NamasteNomad",
    desc: "Full-stack Tourism discovery.",
    longDesc:
      "Comprehensive travel exploration platform for India. Designed hotel discovery engines and booking flows using a scalable full-stack React and Node.js architecture.",
    link: "https://github.com/naman8586/tourism_project",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    className: "md:col-span-2 md:row-span-1 min-h-[200px]",
    icon: <Zap size={28} className="text-zinc-600 group-hover:text-white" />,
  },
  {
    id: 8,
    title: "AskJiJi",
    desc: "AI Contextual Query Assistant.",
    longDesc:
      "Intelligent chat interface leveraging Large Language Models to provide context-aware answers. Built with React and OpenAI integration for high-fidelity NLP interactions.",
    link: "https://github.com/naman8586/askJiJi",
    tags: ["AI", "OpenAI", "NLP", "React"],
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    icon: <Binary size={28} className="text-zinc-600 group-hover:text-white" />,
  },
  {
    id: 9,
    title: "Crypto Dash",
    desc: "Live Cryptocurrency Intelligence.",
    longDesc:
      "Real-time dashboard for market trends and price tracking. Utilizes dynamic charting and live API polling to provide an optimized financial tracking experience.",
    link: "https://github.com/naman8586/Crypto_Dash",
    tags: ["Chart.js", "Financial-API", "React"],
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    icon: <Orbit size={28} className="text-zinc-600 group-hover:text-white" />,
  },
  {
    id: 10,
    title: "JobPortal",
    desc: "Recruitment & Marketplace Engine.",
    longDesc:
      "A dual-sided marketplace connecting talent with recruiters. Built on Node.js and MongoDB with features for resume processing and advanced talent filtering.",
    link: "https://github.com/naman8586/JobPortol",
    tags: ["Node.js", "Express", "Marketplace"],
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    icon: <Cpu size={28} className="text-zinc-600 group-hover:text-white" />,
  }
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
