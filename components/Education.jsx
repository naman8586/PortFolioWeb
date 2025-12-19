"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Award, ExternalLink, Trophy } from "lucide-react";
import { useRef } from "react";

const education = [
  {
    type: "Undergraduate",
    institution: "GGSIPU (Guru Gobind Singh Indraprastha University)",
    degree: "B.Tech in Information Technology",
    duration: "2022 — 2026",
    score: "8.0 CGPA",
    status: "Current",
    details:
      "Focusing on Software Engineering, Data Structures, and Web Technologies.",
  },
  {
    type: "Higher Secondary (XII)",
    institution: "SSLT Gujarat Sr. Sec. School, Delhi (CBSE)",
    degree: "Science & Mathematics",
    duration: "2020 — 2022",
    score: "80%",
    status: "Completed",
    details:
      "Strong foundation in Physics, Chemistry, and Advanced Mathematics.",
  },
  {
    type: "Secondary (X)",
    institution: "SSLT Gujarat Sr. Sec. School, Delhi (CBSE)",
    degree: "General Subjects",
    duration: "2018 — 2020",
    score: "90%",
    status: "Completed",
    details:
      "Awarded for academic excellence in Science and Computer Applications.",
  },
];

const certifications = [
  {
    title: "Full-Stack Web Development Specialization",
    provider: "Coursera",
    link: "https://www.coursera.org/account/accomplishments/specialization/DSOZKNQ4183U",
    tags: ["React", "Node.js", "MongoDB", "Express"],
  },
];

export default function Education() {
  const ref = useRef(null);

  /* 🔥 Scroll-synced parallax */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);

  return (
    <motion.section
      ref={ref}
      id="education"
      style={{ opacity, y, scale }}
      className="relative mx-auto max-w-6xl bg-transparent py-32 px-6"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter">
          Academic{" "}
          <span className="text-zinc-700 italic font-light">Path</span>
        </h2>
        <div className="mt-6 h-1 w-24 rounded-full bg-white" />
      </motion.div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Timeline */}
        <div className="lg:col-span-8 space-y-12">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-12 group"
            >
              {/* Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800 group-hover:bg-zinc-500 transition-colors" />

              {/* Dot */}
              <div
                className={`absolute top-2 -left-1.5 h-3 w-3 rounded-full border border-zinc-900 ${
                  edu.status === "Current"
                    ? "bg-white shadow-[0_0_15px_white]"
                    : "bg-zinc-700"
                }`}
              />

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                    {edu.duration}
                  </span>
                  {edu.status === "Current" && (
                    <span className="animate-pulse rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[8px] uppercase tracking-widest text-white">
                      In Progress
                    </span>
                  )}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-none text-white group-hover:text-zinc-200 transition-colors">
                  {edu.institution}
                </h3>

                <div className="flex items-center gap-2 text-zinc-400 font-light italic">
                  <GraduationCap size={16} />
                  <span>{edu.degree}</span>
                  <span className="mx-2 text-zinc-800">|</span>
                  <Trophy size={14} className="text-zinc-600" />
                  <span className="font-medium text-white">{edu.score}</span>
                </div>

                <p className="max-w-xl text-sm leading-relaxed text-zinc-500">
                  {edu.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-8">
            <h4 className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">
              Credentials
              <div className="h-px flex-1 bg-zinc-900" />
            </h4>

            {certifications.map((cert, i) => (
              <motion.a
                key={i}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="group block rounded-3xl border border-white/5 bg-white/3 p-6 backdrop-blur-xl hover:border-white/20 transition-all"
              >
                <div className="mb-6 flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-white/5 text-zinc-400 group-hover:text-white transition-colors">
                    <Award size={24} />
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-zinc-700 group-hover:text-white transition-colors"
                  />
                </div>

                <h5 className="text-lg font-bold text-white mb-2 leading-tight">
                  {cert.title}
                </h5>
                <p className="text-zinc-500 text-xs mb-6 font-medium uppercase tracking-widest">
                  Verified by {cert.provider}
                </p>

                <div className="flex flex-wrap gap-2">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] uppercase tracking-tighter px-2 py-1 rounded bg-zinc-900 text-zinc-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
