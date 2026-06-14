import React, { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { PixlLogo } from "./components/PixlLogo";
import GraphicsGallery from "./components/GraphicsGallery";
import ContactSection from "./components/ContactSection";
import { Share2, Check, ArrowDownCircle, Sparkles, MapPin, Layers, Briefcase, ChevronRight, Activity } from "lucide-react";

export default function App() {
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  // Parallax Scroll Coordinates driven by scroll hooks
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], [0, 250]);
  const textY = useTransform(scrollY, [0, 800], [0, -120]);
  const decorShapeY = useTransform(scrollY, [0, 1000], [0, -300]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  const handleShareClick = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  return (
    <div className="relative min-h-screen bg-charcoal-pure text-gray-200 overflow-x-hidden selection:bg-neon-violet selection:text-white font-sans antialiased">
      {/* 1. Header / Navigation */}
      <header className="fixed top-0 inset-x-0 z-40 bg-charcoal-pure/80 backdrop-blur-md border-b border-charcoal-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo / Monogram PIXL */}
          <a href="#" className="flex items-center gap-0 group">
            <PixlLogo className="h-5 w-auto text-white transition-all mr-0.5" />
            <span className="font-display text-xl font-bold uppercase tracking-wider text-white">
              IXL
            </span>
          </a>

          {/* Nav Anchors */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider text-gray-400">
          </nav>

          {/* Share button tool */}
          <div>
            <button
              id="btn-share-link"
              onClick={handleShareClick}
              className={`py-2 px-4 rounded-xl text-xs font-mono font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                shareCopied
                  ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                  : "bg-charcoal-dark border-charcoal-border hover:border-neon-violet hover:text-white"
              }`}
            >
              {shareCopied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>COPIED PORTFOLIO LINK</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>SHARE PORTFOLIO</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with dynamic Parallax */}
      <section className="relative min-h-screen flex items-center justify-center pt-18 overflow-hidden z-10">
        {/* Parallax Background Grid */}
        <motion.div
          style={{ y: backgroundY, opacity: opacityHero }}
          className="absolute inset-0 pointer-events-none opacity-25"
        >
          {/* Neon violet radial gradient */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-violet/10 rounded-full blur-[120px]" />
          
          {/* Subtle design matrix background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, #1a1a23 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #1a1a23 40px)",
              backgroundSize: "40px 40px"
            }}
          />
          {/* Floating blueprint coordinates */}
          <div className="absolute top-1/3 left-12 font-mono text-[9px] text-[#8b5cf6]/40 uppercase select-none">
            SYS_REF_H01 // ASPECT 1.618
          </div>
          <div className="absolute bottom-1/4 right-12 font-mono text-[9px] text-[#d946ef]/40 uppercase select-none">
            DEC_CORE // VEC_STATION_Y
          </div>
        </motion.div>

        {/* Floating Abstract Parallax Geometry */}
        <motion.div
          style={{ y: decorShapeY, opacity: opacityHero }}
          className="absolute right-[10%] top-[25%] pointer-events-none hidden lg:block"
        >
          <div className="w-56 h-56 border border-neon-violet/10 rounded-full flex items-center justify-center">
            <div className="w-44 h-44 border border-dashed border-neon-pink/15 rounded-full flex items-center justify-center animate-spin-slow">
              <div className="w-32 h-32 border border-neon-violet/20 rounded-full" />
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 flex flex-col items-center text-center">
          {/* Pill announcement badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 py-1 px-3.5 bg-[#171026] border border-[#ff00a0]/15 rounded-full text-[10px] font-mono tracking-widest text-[#a855f7] uppercase flex items-center gap-1.5"
          >
            <Sparkles className="h-3 w-3 text-neon-pink" />
            <span>Distributed Freelance Design Collective</span>
          </motion.div>

          {/* Large Hero Title Logo Block */}
          <motion.div
            style={{ y: textY, opacity: opacityHero }}
            className="my-3 flex flex-col items-center gap-1"
          >
            <h1 className="flex items-center gap-0 text-7xl md:text-9xl font-display font-bold tracking-tight select-none text-white leading-none">
              <PixlLogo glow={false} className="h-[0.92em] w-auto text-white mr-1.5" />
              <span>IXL</span>
            </h1>
            
            <p className="text-sm md:text-md font-mono tracking-widest text-[#a78bfa] font-medium uppercase mt-2">
              MINIMAL BRANDING // INTERACTIVE UI COMPONENTS
            </p>
          </motion.div>

          {/* Description & Core features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl mt-6 font-sans text-center mx-auto"
          >
            <div className="text-gray-300 space-y-4 text-base md:text-lg leading-relaxed">
              <p className="font-semibold text-white text-lg md:text-xl">
                Welcome to PIXL — where ideas become digital realities.
              </p>
              <p>
                We are a young creative studio helping brands build their online presence through stunning websites, seamless experiences, and bold designs.
              </p>
              <p>
                We believe every business deserves a digital identity that feels unique, memorable, and built for the future.
              </p>
            </div>

            {/* Bullets feature indicators */}
            <div className="grid grid-cols-3 gap-4 items-center justify-center mt-10 pt-8 border-t border-charcoal-border/40 text-left">
              {/* Feature 1 */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-neon-violet-light font-semibold uppercase flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-violet" /> 01 _ IDENTITIES
                </span>
                <span className="text-[11px] text-gray-400">Minimalist guidelines & procedural vector marks.</span>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-1 border-x border-charcoal-border/40 px-4">
                <span className="text-xs font-mono text-neon-pink font-semibold uppercase flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-pink" /> 02 _ COMPONENT
                </span>
                <span className="text-[11px] text-gray-400">Physics-backed, micro-animated client widgets.</span>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-gray-300 font-semibold uppercase flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" /> 03 _ CUSTOM
                </span>
                <span className="text-[11px] text-gray-400">Pure freelance autonomy with cohesive agency standards.</span>
              </div>
            </div>
          </motion.div>

          {/* Call to actions indicators */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
              Scroll down to review portfolios
            </span>
          </motion.div>
        </div>
      </section>

      {/* 4. Section: Design Graphics & Case studies */}
      <section id="gallery" className="py-24 bg-charcoal-dark/50 relative z-20 border-t border-charcoal-border/40 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GraphicsGallery />

          {/* See More Link to Drive Folder */}
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
              // ARCHIVE MEDIA DATA
            </p>
            <a
              href="https://drive.google.com/drive/folders/1QY-U8g5KSz0kPAkXwGS4xDYhEd2QB3uP?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block cursor-pointer"
            >
              <button
                id="btn-drive-folder"
                className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content-[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg flex items-center justify-between"
              >
                <span className="relative z-20">See more</span>
                <ChevronRight className="h-5 w-5 relative z-20 text-gray-200 group-hover:text-rose-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </a>
          </div>
        </div>
      </section>



      {/* 5. Section: Contact & Enquiry */}
      <section id="contact" className="py-24 bg-charcoal-pure relative z-20 border-t border-charcoal-border/60 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactSection />
        </div>
      </section>

      {/* 7. Global Footer */}
      <footer className="bg-charcoal-pure border-t border-charcoal-border py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-[11px] font-mono text-gray-500 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
          </div>

          <div className="flex items-center gap-2 select-none">
            <PixlLogo glow={false} className="h-5 w-auto text-gray-500 hover:text-white transition-colors" />
            <span>© 2026 PIXL LABORATORY. ALL SECRETS CODIFIED.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
