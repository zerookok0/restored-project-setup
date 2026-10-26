import React from 'react';
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  ProductShowcaseSection,
  ProductListSection,
  FAQSection,
} from '../components/home';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductShowcaseSection />
      <ProductListSection />
      <FAQSection />
    </main>
  );
}
