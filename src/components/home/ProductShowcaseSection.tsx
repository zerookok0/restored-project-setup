import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';
import { useScrollReveal } from '../../hooks';

export default function ProductShowcaseSection() {
  const { data } = useSiteData();
  const { ref, isVisible } = useScrollReveal(0.15);
  const showcase = data.productShowcase;
  const product = showcase?.product;

  if (!product) return null;

  return (
    <section id="product-showcase" className="relative py-24 sm:py-32 lg:py-44 overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-brand-primary/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="section-container relative z-10" ref={ref}>
        {/* Header */}
        <div className="relative mb-16 sm:mb-24">
          <div className="absolute -top-8 sm:-top-12 left-0 text-[12vw] sm:text-[10vw] font-black text-white/[0.03] select-none leading-none pointer-events-none">
            {showcase.number}
          </div>
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-brand-primary text-xs sm:text-sm font-semibold tracking-[0.2em] mb-4">
              {showcase.number}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
              {showcase.title}
            </h2>
            <p className="text-lg sm:text-xl gradient-text font-light">{showcase.subtitle}</p>
          </div>
        </div>

        {/* Product spotlight */}
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.04] shadow-2xl shadow-black/20">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-[4/5] sm:aspect-square object-cover hover:scale-[1.02] transition-transform duration-1000"
              />
            </div>
            {/* Soft glow behind image */}
            <div className="absolute -inset-8 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-secondary/5 rounded-[40px] blur-3xl -z-10 opacity-50" />
          </div>

          {/* Info */}
          <div className="space-y-6 lg:space-y-8">
            <div>
              <p className="text-brand-primary text-xs sm:text-sm font-semibold tracking-[0.15em] mb-3">
                旗舰之选
              </p>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-2">
                {product.name}
              </h3>
              <p className="text-xl sm:text-2xl gradient-text font-light">{product.tagline}</p>
            </div>

            <p className="text-base sm:text-lg text-white/45 leading-relaxed font-light max-w-md">
              {product.description}
            </p>

            {/* Price — clean, no strikethrough */}
            <div>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
                {product.price}
              </span>
            </div>

            {/* Features — minimal pill tags */}
            <div className="flex flex-wrap gap-2">
              {product.features.map((feat, i) => (
                <span
                  key={i}
                  className="text-xs sm:text-sm text-white/35 px-4 py-2 rounded-full border border-white/[0.06] hover:border-brand-primary/30 hover:text-brand-primary transition-all duration-300"
                >
                  {feat}
                </span>
              ))}
            </div>

            {/* Single confident CTA */}
            <button className="group inline-flex items-center gap-3 text-white text-base sm:text-lg font-medium tracking-wide hover:gap-5 transition-all duration-500 pt-2">
              <span className="w-10 h-[1px] bg-white/30 group-hover:w-14 group-hover:bg-brand-primary transition-all duration-500" />
              {product.cta}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
