
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, PlayCircle, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const TAGLINE = "Education is the right of every child – everywhere.";

export default function HeroSection() {
  const [displayedTagline, setDisplayedTagline] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < TAGLINE.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedTagline((prev) => prev + TAGLINE[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100); // Adjust typing speed here
      return () => clearTimeout(timeoutId);
    }
  }, [charIndex]);
  

  return (
    <div className="relative h-[calc(100vh-4rem)] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
      <Image
        src="https://wsuwp-uploads.s3.amazonaws.com/uploads/sites/90/2015/08/EDUCATION-text.jpg"
        alt="Abstract image with the word EDUCATION"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="z-0 filter brightness-50"
        priority
      />
      <div className="relative z-10 p-4 sm:p-8 flex flex-col items-center">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 shadow-lg">
          {displayedTagline}
          <span className="animate-blink border-r-2 border-white ml-1"></span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl shadow-md">
          Join Sudan Shines and unlock a brighter future through high-quality, free education.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105" asChild>
            <Link href="/dashboard">
              Join a Live Class <PlayCircle className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="secondary" size="lg" className="shadow-lg transition-transform hover:scale-105" asChild>
            <Link href="/videos">
              Explore Lessons <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary shadow-lg transition-transform hover:scale-105" asChild>
            <Link href="/about#volunteer">
              Become a Volunteer <Users className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
