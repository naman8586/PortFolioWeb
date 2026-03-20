/**
 * components/ProjectsSkeleton.jsx
 * ─────────────────────────────────────────────────────────
 * Shimmer loading skeleton that mirrors the bento-grid
 * layout of the real project cards. Shown via React Suspense
 * while the GitHub API data is being fetched server-side.
 * ─────────────────────────────────────────────────────────
 */

export default function ProjectsSkeleton() {
  // Mirror the bento layout: 1 large (col-span-2), 2 medium, 1 tall, etc.
  const skeletonSizes = [
    "md:col-span-2 md:row-span-2 min-h-[400px]",
    "md:col-span-1 md:row-span-1 min-h-[200px]",
    "md:col-span-1 md:row-span-1 min-h-[200px]",
    "md:col-span-1 md:row-span-2 min-h-[400px]",
    "md:col-span-1 md:row-span-1 min-h-[200px]",
    "md:col-span-1 md:row-span-1 min-h-[200px]",
  ];

  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3">
      {skeletonSizes.map((size, i) => (
        <div
          key={i}
          className={`${size} relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0a0a0a] p-8`}
        >
          {/* Shimmer sweep animation */}
          <div
            className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
              animationDelay: `${i * 0.15}s`,
            }}
          />

          {/* Icon placeholder */}
          <div className="mb-8 h-12 w-12 rounded-2xl bg-white/5" />

          {/* Title placeholder */}
          <div className="mb-3 h-6 w-2/3 rounded-lg bg-white/5" />

          {/* Description placeholder */}
          <div className="space-y-2">
            <div className="h-3 w-full rounded-md bg-white/4" />
            <div className="h-3 w-4/5 rounded-md bg-white/4" />
          </div>

          {/* Footer placeholder */}
          <div className="mt-8 flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="h-3 w-16 rounded-md bg-white/5" />
            <div className="ml-auto flex items-center gap-1">
              <div className="h-3 w-3 rounded bg-white/5" />
              <div className="h-3 w-6 rounded bg-white/5" />
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
