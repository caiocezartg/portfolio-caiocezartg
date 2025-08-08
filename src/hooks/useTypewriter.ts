"use client";

import { useState, useEffect } from 'react';

interface UseTypewriterProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
}

export function useTypewriter({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000
}: UseTypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(prev => prev.slice(0, -1));
        
        if (displayText === '') {
          setIsDeleting(false);
          setWordIndex(prev => (prev + 1) % words.length);
        }
      } else {
        setDisplayText(prev => currentWord.slice(0, prev.length + 1));
        
        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, wordIndex, isDeleting, words, typeSpeed, deleteSpeed, delayBetweenWords]);

  return displayText;
}