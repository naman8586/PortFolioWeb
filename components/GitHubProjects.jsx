"use client";
/**
 * components/GitHubProjects.jsx — CLIENT COMPONENT
 * ─────────────────────────────────────────────────────────
 * Fetches project data from /api/projects (our own Next.js
 * Route Handler) so that GITHUB_TOKEN stays server-side.
 *
 * States: loading → skeleton | error → friendly message | success → grid
 * ─────────────────────────────────────────────────────────
 */
import { useState, useEffect } from "react";
import { Star, FolderOpen, Github } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import ProjectsSkeleton from "@/components/ProjectsSkeleton";

export default function GitHubProjects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus]     = useState("loading"); // "loading" | "error" | "ok"
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setProjects(data.projects ?? []);
          setStatus("ok");
        }
      } catch (err) {
        if (!cancelled) {
          setErrorMsg(err.message);
          setStatus("error");
        }
      }
    }

    fetchProjects();
    return () => { cancelled = true; };
  }, []);

  /* ── Loading ── */
  if (status === "loading") return <ProjectsSkeleton />;

  /* ── Error ── */
  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-red-500/20 bg-red-500/5 py-20 text-center">
        <p className="text-sm font-medium text-red-400">Could not load GitHub projects</p>
        <p className="mt-2 text-[10px] uppercase tracking-widest text-zinc-600">{errorMsg}</p>
        <a
          href="https://github.com/naman8586"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400 transition hover:text-white"
        >
          <Github size={13} /> View on GitHub
        </a>
      </div>
    );
  }

  /* ── Empty ── */
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-white/5 bg-white/2 py-20 text-center">
        <FolderOpen size={32} className="mb-4 text-zinc-700" />
        <p className="text-sm font-medium text-zinc-500">No featured projects yet</p>
        <p className="mt-2 text-[10px] uppercase tracking-widest text-zinc-700">
          Add the &quot;portfolio&quot; topic to your GitHub repos
        </p>
      </div>
    );
  }

  const totalStars = projects.reduce((sum, p) => sum + p.stars, 0);

  return (
    <div>
      {/* ── GitHub Stats Strip ── */}
      <div className="mb-12 flex flex-wrap gap-4">
        <StatPill icon={<Star size={11} />} label="Total Stars" value={totalStars} />
        <StatPill icon={<FolderOpen size={11} />} label="Featured" value={`${projects.length} repos`} />
        <StatPill
          icon={<Github size={11} />}
          label="GitHub"
          value="naman8586"
          href="https://github.com/naman8586"
        />
      </div>

      {/* ── Bento Grid ── */}
      <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

function StatPill({ icon, label, value, href }) {
  const inner = (
    <span className="flex items-center gap-2 rounded-full border border-white/5 bg-white/3 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500 transition hover:border-white/10 hover:text-zinc-300">
      {icon}
      <span className="text-white">{value}</span>
      <span className="text-zinc-700">/</span>
      {label}
    </span>
  );
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
    : inner;
}
