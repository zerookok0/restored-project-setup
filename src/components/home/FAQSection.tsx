import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';
import { useScrollReveal } from '../../hooks';

export default function FAQSection() {
  const { data } = useSiteData();
  const { ref, isVisible } = useScrollReveal(0.15);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div className="section-container relative z-10" ref={ref}>
        <div className="relative mb-12 md:mb-20">
          <div className="section-number -top-8 sm:-top-12 left-0">{data.faq.number}</div>

          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-brand-primary text-sm font-semibold tracking-widest mb-3">{data.faq.number}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3">{data.faq.title}</h2>
            <p className="text-lg gradient-text font-semibold">{data.faq.subtitle}</p>
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {data.faq.items.map((item, i) => (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-300 ${
                openId === item.id
                  ? 'border-brand-primary/30 bg-brand-primary/[0.03]'
                  : 'border-white/5 bg-white/[0.01] hover:border-white/10'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: isVisible ? `${i * 0.08}s` : '0s' }}
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left"
              >
                <span className="text-white font-semibold text-sm sm:text-base pr-4">{item.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  openId === item.id ? 'bg-brand-primary text-white rotate-45' : 'bg-white/5 text-white/40'
                }`}>
                  <Plus size={16} />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 ${
                  openId === item.id ? 'max-h-96 pb-5 px-5 sm:px-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm text-white/50 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
