"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  /* 🔥 Scroll sync */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [120, 0, -120]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSending(true);

    const formData = new FormData(event.target);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    const result = await response.json();
    setIsSending(false);

    if (result.success) {
      setIsSent(true);
      event.target.reset();
      setTimeout(() => setIsSent(false), 5000);
    }
  }

  // Common Input Styles to fix the blue border and visibility
  const inputStyles = `
    w-full border-b border-zinc-800 bg-transparent py-4 
    text-lg font-light text-white 
    placeholder:text-zinc-500 
    focus:border-white focus:outline-none focus:ring-0
    caret-white transition-all duration-500
  `;

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      style={{ opacity, y, scale }}
      className="relative mx-auto max-w-6xl py-40 px-6"
    >
      {/* Header */}
      <div className="mb-24 text-center md:text-left">
        <h2 className="mb-6 ml-1 text-[10px] font-black uppercase tracking-[0.8em] text-zinc-600">
          Transmission
        </h2>
        <p className="text-5xl font-bold leading-tight tracking-tighter text-white md:text-7xl">
          Let&apos;s build <br />
          <span className="italic font-extralight text-zinc-700">
            something real.
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-24 lg:grid-cols-12">
        {/* Left Info */}
        <div className="lg:col-span-4 space-y-16">
          <ContactMethod
            label="Email "
            value="namanverma8586@gmail.com"
            link="mailto:namanverma8586@gmail.com"
          />
          <ContactMethod
            label="Phone No."
            value="+91 8586055740"
            link="tel:+918586055740"
          />
          <ContactMethod label="Location" value="Delhi, India" />
        </div>

        {/* Form */}
        <div className="relative lg:col-span-8">
          <form onSubmit={handleSubmit} className="relative space-y-12">
            <input type="checkbox" name="botcheck" className="hidden" />

            <div className="grid gap-12 md:grid-cols-2">
              <div className="relative group">
                <input
                  name="name"
                  required
                  placeholder="Your Name"
                  className={inputStyles}
                />
              </div>
              <div className="relative group">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address"
                  className={inputStyles}
                />
              </div>
            </div>

            <div className="relative group">
              <textarea
                name="message"
                rows={4}
                required
                placeholder="What's on your mind?"
                className={inputStyles + " resize-none"}
              />
            </div>

            <div className="flex justify-end pt-8">
              <motion.button
                type="submit"
                disabled={isSending || isSent}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.5em] text-white disabled:text-zinc-700 transition-colors"
              >
                {isSending
                  ? "Processing..."
                  : isSent
                  ? "Message Logged"
                  : "Send Transmission"}
                {!isSent && !isSending && (
                  <ArrowUpRight
                    size={18}
                    className="text-zinc-600 group-hover:text-white transition-colors"
                  />
                )}
                {isSent && <CheckCircle2 size={18} className="text-white" />}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </motion.section>
  );
}

function ContactMethod({ label, value, link }) {
  return (
    <div className="group">
      <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.5em] text-zinc-700 transition-colors group-hover:text-zinc-500">
        {label}
      </p>
      {link ? (
        <a
          href={link}
          className="text-xl font-light text-zinc-300 hover:text-white transition-colors"
        >
          {value}
        </a>
      ) : (
        <p className="text-xl font-light text-zinc-300">{value}</p>
      )}
    </div>
  );
}
