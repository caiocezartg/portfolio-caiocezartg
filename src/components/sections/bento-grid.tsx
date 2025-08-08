"use client";

import { forwardRef } from "react";
import BentoCard from "@/components/ui/bento-card";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiPython,
  SiGithub,
} from "react-icons/si";
import {
  ExternalLink,
  Coffee,
  User,
  MapPin,
  Heart,
  Zap,
  Gamepad2,
} from "lucide-react";
import Image from "next/image";

const BentoGridSection = forwardRef<HTMLElement>((props, ref) => {
  const techStack = [
    { icon: SiReact, name: "React" },
    { icon: SiNextdotjs, name: "Next.js" },
    { icon: SiNodedotjs, name: "Node.js" },
    { icon: SiTypescript, name: "TypeScript" },
    { icon: SiTailwindcss, name: "Tailwind" },
    { icon: SiPython, name: "Python" },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="flex items-center justify-center px-4 py-12"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BentoCard
            className="md:col-span-2 lg:col-span-2 lg:row-span-2 md:pb-0"
            delay={0}
          >
            <div className="h-full flex flex-col justify-start relative">
              <Image
                src={"/cc.png"}
                width={150}
                height={182}
                alt="caiocezartg"
                className="absolute bottom-0 right-0 hidden md:block"
              />
              <div className="flex items-center mb-6">
                <User className="w-8 h-8 text-accent mr-3" />
                <h3 className="text-2xl font-bold text-foreground font-heading">
                  About me
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-text-secondary text-lg">
                      Living in Brazil, crafting digital experiences worldwide
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Zap className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-text-secondary text-lg">
                      Studying DevOps and cloud services like AWS
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-text-secondary text-lg">
                      Love my cats, playing board games and re-watching Breaking
                      Bad for the zillionth time
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Gamepad2 className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-text-secondary text-lg">
                      Playing Death Stranding 2
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Tech Stack */}
          <BentoCard className="lg:col-span-2" delay={0.1}>
            <h3 className="text-xl font-bold text-foreground mb-4 font-heading">
              Some stacks that I&apos;ve worked with
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center p-3 rounded-xl bg-card-bg border border-card-border hover:border-accent transition-colors"
                >
                  <tech.icon className="w-8 h-8 text-accent mb-2" />
                  <span className="text-sm text-text-secondary font-medium">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* GitHub */}
          <BentoCard className="lg:col-span-1" delay={0.2}>
            <div className="h-full flex flex-col justify-start">
              <div className="flex items-center mb-4">
                <SiGithub className="w-8 h-8 text-accent mr-3" />
                <h3 className="text-xl font-bold text-foreground font-heading">
                  GitHub
                </h3>
              </div>
              <p className="text-text-secondary mb-6 text-sm">
                Check out my projects and open source contributions
              </p>
              <a
                href="https://github.com/caiocezartg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-accent hover:text-accent/80 transition-colors font-medium"
              >
                View Projects
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </BentoCard>

          {/* Fun Fact */}
          <BentoCard className="lg:col-span-1" delay={0.3}>
            <div className="h-full flex flex-col justify-start">
              <div className="flex items-center mb-4">
                <Coffee className="w-8 h-8 text-accent mr-3" />
                <h3 className="text-xl font-bold text-foreground font-heading">
                  Fun Fact
                </h3>
              </div>
              <p className="text-text-secondary text-sm">
                Lover of coffee and clean code. In my spare time, I enjoy
                exploring the world of indie games and discovering new design
                patterns.
              </p>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
});

BentoGridSection.displayName = "BentoGridSection";
export default BentoGridSection;
