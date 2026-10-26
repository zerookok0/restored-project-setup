import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';

export default function Footer() {
  const { data } = useSiteData();

  return (
    <footer className="relative border-t border-white/5 bg-surface-dark">
      <div className="section-container py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                <ShoppingBag size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-wider">{data.brand.name}</span>
            </a>
            <p className="text-sm text-white/40 leading-relaxed mb-6 mt-4 max-w-xs">
              {data.footer.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">探索</h4>
            <ul className="space-y-3">
              {data.footer.links.slice(0, 4).map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">法律</h4>
            <ul className="space-y-3">
              {data.footer.links.slice(4).map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">社交媒体</h4>
            <div className="flex flex-wrap gap-2">
              {data.footer.social.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="px-4 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-sm text-white/50 hover:text-white hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all duration-300"
                >
                  {s.platform}
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-white/20">
              {data.footer.copyright}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            {data.footer.copyright}
          </p>
          <p className="text-xs text-white/20 flex items-center gap-1">
            Made with <Heart size={12} className="text-brand-accent" /> by LUMINA
          </p>
        </div>
      </div>
    </footer>
  );
}
