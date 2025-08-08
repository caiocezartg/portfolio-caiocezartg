"use client";

import { useTypewriter } from '@/hooks/useTypewriter';

interface TypewriterEffectProps {
  words: string[];
  className?: string;
}

export default function TypewriterEffect({ words, className = '' }: TypewriterEffectProps) {
  const displayText = useTypewriter({ words });

  return (
    <span className={`${className}`}>
      {displayText}
      <span className="typewriter-cursor text-accent">|</span>
    </span>
  );
}