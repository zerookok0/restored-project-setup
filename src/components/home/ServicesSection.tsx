import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';
import { useScrollReveal } from '../../hooks';

export default function ServicesSection() {
  const { data } = useSiteData();
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section id="services" className="relative py-24 sm:py-32 lg:py-44 overflow-hidden">
      <div className="section-container relative z-10" ref={ref}>
        {/* Header */}
        <div className="relative mb-16 sm:mb-24">
          <div className="absolute -top-8 sm:-top-12 left-0 text-[12vw] sm:text-[10vw] font-black text-white/[0.03] select-none leading-none pointer-events-none">
            {data.services.number}
          </div>
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-brand-primary text-xs sm:text-sm font-semibold tracking-[0.2em] mb-4">
              {data.services.number}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
              {data.services.title}
            </h2>
            <p className="text-lg sm:text-xl gradient-text font-light">{data.services.subtitle}</p>
          </div>
        </div>

        {/* Series — horizontal stacked cards, image-dominant */}
        <div className="space-y-6 sm:space-y-8">
          {data.services.items.map((service, i) => (
            <div
              key={service.id}
              className={`group relative grid sm:grid-cols-2 gap-0 items-stretch rounded-3xl overflow-hidden border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08] transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 0.1}s` : '0s' }}
            >
              {/* Image side */}
              <div className={`aspect-[4/3] sm:aspect-auto overflow-hidden ${i % 2 === 0 ? 'sm:order-1' : 'sm:order-2'}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>

              {/* Text side */}
              <div className={`flex flex-col justify-center p-8 sm:p-12 lg:p-16 ${i % 2 === 0 ? 'sm:order-2' : 'sm:order-1'}`}>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 group-hover:gradient-text transition-all duration-500">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-white/40 leading-relaxed mb-6 max-w-sm font-light">
                  {service.description}
                </p>
                {/* Features — minimal tags, no checkmarks */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feat, j) => (
                    <span
                      key={j}
                      className="text-xs text-white/30 px-3 py-1.5 rounded-full border border-white/[0.06]"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
                {/* Ghost CTA */}
                <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-white/25 group-hover:text-brand-primary transition-colors duration-500 font-medium">
                  探索系列 <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
