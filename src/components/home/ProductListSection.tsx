import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';
import { useScrollReveal } from '../../hooks';

export default function ProductListSection() {
  const { data } = useSiteData();
  const { ref, isVisible } = useScrollReveal(0.15);
  const productList = data.productList;

  if (!productList?.items?.length) return null;

  return (
    <section id="product-list" className="relative py-24 sm:py-32 lg:py-44 overflow-hidden">
      {/* Background subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #9E7FFF 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="section-container relative z-10" ref={ref}>
        {/* Header */}
        <div className="relative mb-16 sm:mb-24">
          <div className="absolute -top-8 sm:-top-12 left-0 text-[12vw] sm:text-[10vw] font-black text-white/[0.03] select-none leading-none pointer-events-none">
            {productList.number}
          </div>
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-brand-primary text-xs sm:text-sm font-semibold tracking-[0.2em] mb-4">
              {productList.number}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
              {productList.title}
            </h2>
            <p className="text-lg sm:text-xl gradient-text font-light">{productList.subtitle}</p>
          </div>
        </div>

        {/* Product Cards — clean grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {productList.items.map((product, i) => (
            <div
              key={product.id}
              className={`group relative rounded-2xl overflow-hidden border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08] transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 0.1}s` : '0s' }}
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-800"
                />
              </div>

              {/* Content — minimal */}
              <div className="p-5 sm:p-6">
                <span className="text-[10px] sm:text-xs text-brand-primary/70 font-medium tracking-[0.15em]">
                  {product.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold mt-1 group-hover:gradient-text transition-all duration-300">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/35 leading-relaxed mt-1 mb-4">
                  {product.description}
                </p>

                {/* Price — clean, single line */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                  <span className="text-lg sm:text-xl font-bold">{product.price}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-white/25 group-hover:text-brand-primary transition-colors duration-300 font-medium">
                    了解 <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
