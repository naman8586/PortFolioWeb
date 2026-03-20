"use client";
import Link from "next/link";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { LANGUAGE_COLORS } from "@/lib/github";

const CARD_ICONS = ["⬡", "◈", "⬟", "◉", "⬢", "◍", "⬣", "◎"];

export default function ProjectCard({ project, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const langColor = LANGUAGE_COLORS[project.language] ?? "#6b7280";
  const icon = CARD_ICONS[index % CARD_ICONS.length];

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
    <Link href={`/projects/${project.name}`} target="_blank" className={`${bentoClass} block group relative`}>
      <motion.div
        layoutId={`gh-card-${project.id}`}
        onMouseMove={onMouseMove}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#050505] p-8 transition-all duration-500 group-hover:border-white/10"
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5 bg-white/2 text-xl text-zinc-500 transition-all duration-700 group-hover:scale-110 group-hover:text-white">
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
            className="mb-2 break-words text-xl font-bold tracking-tight text-white md:text-2xl"
          >
            {project.displayName}
          </motion.h3>
          <p className="line-clamp-2 flex-1 break-words text-sm font-light leading-relaxed text-zinc-500 transition-colors group-hover:text-zinc-400">
            {project.description ?? "No description provided."}
          </p>
        </div>

        {/* Footer: language dot + stars */}
        <div className="relative z-10 mt-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-700">
          {project.language && (
            <>
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
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
    </Link>
  );
}
