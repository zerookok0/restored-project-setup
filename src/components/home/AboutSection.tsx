import React from 'react';
import { useSiteData } from '../../context/SiteContext';
import { useScrollReveal } from '../../hooks';

export default function AboutSection() {
  const { data } = useSiteData();
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="about" className="relative py-24 sm:py-32 lg:py-44 overflow-hidden">
      <div className="section-container relative z-10" ref={ref}>
        {/* Large typographic section number — ghosted */}
        <div className="absolute top-0 left-4 sm:left-6 lg:left-8 text-[12vw] sm:text-[10vw] font-black text-surface-dark/50 dark:text-white/[0.03] select-none leading-none pointer-events-none">
          {data.about.number}
        </div>

        <div
          className={`max-w-3xl transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Label */}
          <p className="text-brand-primary text-xs sm:text-sm font-semibold tracking-[0.2em] mb-6">
            {data.about.number}
          </p>

          {/* Main manifesto headline — large, poetic */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
            {data.about.title}
          </h2>

          {/* Subtitle — gradient accent */}
          <p className="text-xl sm:text-2xl md:text-3xl gradient-text font-light mb-12 leading-relaxed">
            {data.about.subtitle}
          </p>

          {/* Body — spacious, editorial */}
          <div className="space-y-6 mb-16">
            {data.about.paragraphs.map((p, i) => (
              <p key={i} className="text-base sm:text-lg text-white/50 leading-relaxed font-light max-w-2xl">
                {p}
              </p>
            ))}
          </div>

          {/* Features — minimal, no icons, just clean typography */}
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-12 pt-8 border-t border-white/[0.06]">
            {data.about.features.map((feat, i) => (
              <div key={i}>
                <h4 className="text-white font-semibold text-sm sm:text-base mb-2">{feat.title}</h4>
                <p className="text-xs sm:text-sm text-white/35 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Large image — separate, below text, editorial layout */}
        <div className="mt-16 sm:mt-24">
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.06]">
            <img
              src={data.about.image}
              alt=""
              className="w-full h-auto object-cover aspect-[21/9] sm:aspect-[21/7] hover:scale-[1.01] transition-transform duration-1000"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
