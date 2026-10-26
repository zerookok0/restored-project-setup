import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';

export default function HeroSection() {
  const { data } = useSiteData();
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const parallaxScale = 1 + scrollY * 0.0003;
  const parallaxY = scrollY * 0.15;
  const opacity = Math.max(0, 1 - scrollY / 600);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-end pb-16 sm:pb-20 overflow-hidden"
    >
      {/* Full-bleed Background Image with parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.hero.background}
          alt=""
          className="w-full h-full object-cover"
          style={{
            transform: `scale(${parallaxScale}) translateY(${parallaxY}px)`,
            willChange: 'transform',
          }}
        />
        {/* Ultra-minimal gradient overlay — just enough for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/30 to-transparent" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)',
        }}
      />

      {/* Content — pushed to bottom for cinematic feel */}
      <div
        className="relative z-10 section-container w-full pb-8 sm:pb-12"
        style={{ opacity }}
      >
        <div
          className={`max-w-3xl transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Product name — heroic, restrained */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.02] mb-4 sm:mb-6">
            <span className="block !text-white">{data.hero.title}</span>
            <span className="block !text-white/70 font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 sm:mt-3 tracking-wide">
              {data.hero.subtitle}
            </span>
          </h1>

          {/* Description — whisper, don't shout */}
          <p className="text-base sm:text-lg !text-white/50 max-w-xl mb-8 sm:mb-10 leading-relaxed font-light">
            {data.hero.description}
          </p>

          {/* Single, confident CTA */}
          <button
            onClick={() => scrollToSection('#product-showcase')}
            className="group inline-flex items-center gap-3 !text-white text-lg sm:text-xl font-medium tracking-wide hover:gap-5 transition-all duration-500"
          >
            <span className="w-12 h-[1px] !bg-white/40 group-hover:w-16 group-hover:!bg-white transition-all duration-500" />
            {data.hero.cta.primary}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
