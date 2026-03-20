"use client";
/**
 * components/ProjectCard.jsx
 * ─────────────────────────────────────────────────────────
 * Client component — renders a single GitHub project card.
 *
 * Features:
 *  • Mouse-spotlight hover effect (matches existing portfolio style)
 *  • Stars count + language dot with GitHub's official colors
 *  • Live demo pulsing green badge (if `homepageUrl` exists)
 *  • "Updated X ago" relative timestamp
 *  • Expandable modal with full description + GitHub + Live Demo links
 *  • Framer Motion layoutId shared element transitions
 * ─────────────────────────────────────────────────────────
 */
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { Github, ExternalLink, Star, X, Globe } from "lucide-react";
import { LANGUAGE_COLORS, timeAgo } from "@/lib/github";

/* ─── Icon pool — assigned by index so each card gets a consistent icon ─── */
const CARD_ICONS = ["⬡", "◈", "⬟", "◉", "⬢", "◍", "⬣", "◎"];

export default function ProjectCard({ project, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const langColor = LANGUAGE_COLORS[project.language] ?? "#6b7280";
  const icon = CARD_ICONS[index % CARD_ICONS.length];

  /* Bento layout assignment — first card spans 2 cols & 2 rows */
  const bentoClass =
    index === 0
      ? "md:col-span-2 md:row-span-2 min-h-[400px]"
      : index === 3
      ? "md:col-span-1 md:row-span-2 min-h-[400px]"
      : index === 6
      ? "md:col-span-2 md:row-span-1 min-h-[200px]"
      : "md:col-span-1 md:row-span-1 min-h-[200px]";

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <>
      {/* ── Card ── */}
      <motion.div
        layoutId={`gh-card-${project.id}`}
        onClick={() => setIsOpen(true)}
        onMouseMove={onMouseMove}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`${bentoClass} group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#050505] p-8 transition-all duration-500 hover:border-white/10`}
      >
        {/* Spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)`,
          }}
        />

        {/* Top row: icon + live badge / external link */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5 bg-white/2 text-xl text-zinc-500 transition-all duration-700 group-hover:text-white group-hover:scale-110">
            {icon}
          </div>

          <div className="flex items-center gap-2 pt-1">
            {project.homepageUrl && (
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Live
              </span>
            )}
            <ExternalLink
              size={15}
              className="text-zinc-700 transition-colors group-hover:text-white"
            />
          </div>
        </div>

        {/* Title + description */}
        <div className="relative z-10 mt-6 flex-1">
          <motion.h3
            layoutId={`gh-title-${project.id}`}
            className="mb-2 text-xl font-bold tracking-tight text-white md:text-2xl break-words"
          >
            {project.displayName}
          </motion.h3>
          <p className="line-clamp-2 text-sm font-light leading-relaxed flex-1 break-words text-zinc-500 transition-colors group-hover:text-zinc-400">
            {project.description ?? "No description provided."}
          </p>
        </div>

        {/* Footer: language dot + stars + timestamp */}
        <div className="relative z-10 mt-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-700">
          {project.language && (
            <>
              <span
                className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: langColor }}
              />
              <span>{project.language}</span>
            </>
          )}

          <div className="ml-auto flex items-center gap-1 text-zinc-700">
            <Star size={11} />
            <span>{project.stars}</span>
          </div>
        </div>
      </motion.div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl"
            />

            {/* Modal panel */}
            <motion.div
              layoutId={`gh-card-${project.id}`}
              className="fixed inset-0 z-[101] m-auto h-fit w-[calc(100%-2rem)] max-h-[90vh] max-w-3xl overflow-y-auto rounded-[3rem] border border-white/10 bg-[#050505] p-8 shadow-2xl md:p-14"
            >
              {/* Close */}
              <button
                suppressHydrationWarning
                onClick={() => setIsOpen(false)}
                className="absolute right-8 top-8 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition hover:border-white/20 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="space-y-10">
                {/* Title */}
                <motion.h2
                  layoutId={`gh-title-${project.id}`}
                  className="text-4xl font-bold tracking-tighter text-white md:text-6xl break-words"
                >
                  {project.displayName}
                </motion.h2>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-widest text-zinc-600">
                  {project.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: langColor }}
                      />
                      {project.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star size={10} />
                    {project.stars} stars
                  </span>
                  {project.pushedAt && (
                    <span>Updated {timeAgo(project.pushedAt)}</span>
                  )}
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                  {/* Description */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                        About
                      </h4>
                      <p className="text-base font-light leading-relaxed text-zinc-400 break-words">
                        {project.description ?? "No description provided."}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        suppressHydrationWarning
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-black transition hover:bg-zinc-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={14} /> Source Code
                      </a>

                      {project.homepageUrl && (
                        <a
                          suppressHydrationWarning
                          href={project.homepageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-white transition hover:border-white/20 hover:bg-white/10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe size={14} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Topics */}
                  {project.topics.filter((t) => t !== "portfolio").length > 0 && (
                    <div>
                      <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                        Topics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.topics
                          .filter((t) => t !== "portfolio")
                          .map((topic) => (
                            <span
                              key={topic}
                              className="rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400"
                            >
                              {topic}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
