import { getPortfolioProjects, LANGUAGE_COLORS, timeAgo } from "@/lib/github";
import { notFound } from "next/navigation";
import { Github, Globe, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ProjectDetails({ params }) {
  const { name } = await params;
  const projects = await getPortfolioProjects();
  const project = projects.find((p) => p.name === name);

  if (!project) {
    notFound();
  }

  const langColor = LANGUAGE_COLORS[project.language] ?? "#6b7280";

  return (
    <main className="relative min-h-screen bg-black px-6 py-24 text-white selection:bg-white/30">
      <div className="mx-auto max-w-4xl pt-12 md:pt-20">
        <Link 
          href="/#projects" 
          className="mb-12 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-widest text-zinc-400 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
        
        <div className="rounded-[3rem] border border-white/10 bg-[#050505] p-8 shadow-2xl md:p-14">
          <div className="space-y-10">
            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tighter text-white md:text-6xl break-words">
              {project.displayName}
            </h1>

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
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-black transition hover:bg-zinc-200"
                  >
                    <Github size={14} /> Source Code
                  </a>

                  {project.homepageUrl && (
                    <a
                      href={project.homepageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-white transition hover:border-white/20 hover:bg-white/10"
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
        </div>
      </div>
    </main>
  );
}
