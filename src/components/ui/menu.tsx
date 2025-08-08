"use client";

import { motion } from "framer-motion";
import { Home, User, Mail } from "lucide-react";
import { useState, useEffect, RefObject } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FloatingNavProps {
  sectionRefs: {
    home: RefObject<HTMLElement | null>;
    about: RefObject<HTMLElement | null>;
    contact: RefObject<HTMLElement | null>;
  };
}

export default function FloatingNav({ sectionRefs }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState("home");

  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const scrollToSection = (sectionId: keyof typeof sectionRefs) => {
    const element = sectionRefs[sectionId].current;
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Check sections in reverse order to prioritize lower sections
      const sectionOrder = ["contact", "about", "home"] as const;

      for (const sectionId of sectionOrder) {
        const section = sectionRefs[sectionId].current;
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-72 md:w-80 backdrop-blur-lg rounded-2xl"
    >
      <div className="flex items-center justify-between gap-2 p-2 pl-5 bg-neutral-500/20 border rounded-2xl border-white/10 shadow-lg">
        <h2 className="text-md md:text-xl font-bold">caiocezartg</h2>

        <div className="flex items-center justify-end">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() =>
                  scrollToSection(item.id as keyof typeof sectionRefs)
                }
                className={`
                group relative p-3 rounded-xl transition-all duration-300 cursor-pointer
                ${
                  isActive
                    ? "bg-accent/20 text-accent"
                    : "text-text-secondary hover:text-accent hover:bg-accent/10"
                }
              `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />

                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="px-2 py-1 text-xs text-foreground bg-background/90 border border-card-border rounded-lg whitespace-nowrap backdrop-blur-sm">
                    {item.label}
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-xl bg-accent/20 border border-accent/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
