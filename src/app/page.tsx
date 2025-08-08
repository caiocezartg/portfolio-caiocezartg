"use client";

import { useRef } from "react";
import HeroSection from "@/components/sections/hero";
import BentoGridSection from "@/components/sections/bento-grid";
import ContactSection from "@/components/sections/contact";
import FloatingNav from "@/components/ui/menu";

export default function Home() {
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sectionRefs = {
    home: homeRef,
    about: aboutRef,
    contact: contactRef,
  };

  return (
    <main className="relative">
      <FloatingNav sectionRefs={sectionRefs} />
      <HeroSection ref={homeRef} />
      <BentoGridSection ref={aboutRef} />
      <ContactSection ref={contactRef} />
    </main>
  );
}
