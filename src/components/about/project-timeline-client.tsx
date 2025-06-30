
"use client";

import { PageWrapper } from '@/components/ui/page-wrapper';
import TimelineEvent from './timeline-event';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HandHeart, School, Laptop } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const timelineData = [
  { date: '2023 - Q1', title: 'Project Inception', description: 'The idea for Sudan Shines was born, aiming to bridge the educational gap in underserved regions of Sudan.', imageUrl: 'https://placehold.co/300x200.png', imageHint: "idea lightbulb" },
  { date: '2023 - Q3', title: 'Platform Development Begins', description: 'A dedicated team of volunteers started building the Sudan Shines online learning platform.', imageUrl: 'https://placehold.co/300x200.png', imageHint: "team collaboration" },
  { date: '2024 - Q1', title: 'Pilot Program Launch', description: 'Successfully launched a pilot program in two rural communities, providing access to 100+ students.', imageUrl: 'https://placehold.co/300x200.png', imageHint: "students learning" },
  { date: '2024 - Q2', title: 'Content Expansion', description: 'Added new courses and subjects based on feedback from the pilot program, expanding our curriculum.', imageUrl: 'https://placehold.co/300x200.png', imageHint: "online course" },
  { date: 'Future', title: 'Nationwide Reach', description: 'Our vision is to expand Sudan Shines to reach every child in Sudan, empowering a generation through education.', imageUrl: 'https://placehold.co/300x200.png', imageHint: "Sudan children" },
];

const testimonials = [
  { quote: "Sudan Shines has opened a new world of learning for me. I can now dream bigger!", author: "Fatima, Student", imageUrl: "https://placehold.co/100x100.png", imageHint: "smiling student" },
  { quote: "Teaching with Sudan Shines has been an incredibly rewarding experience. The students are so eager to learn.", author: "Ahmed, Volunteer Teacher", imageUrl: "https://placehold.co/100x100.png", imageHint: "teacher classroom" },
  { quote: "This platform is a beacon of hope. It's amazing to see technology used to empower our youth.", author: "Aisha, Community Leader", imageUrl: "https://placehold.co/100x100.png", imageHint: "community support" },
];

export default function ProjectTimelineClient() {
  return (
    <PageWrapper>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-headline font-bold mb-2">Our Mission & Journey</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Discover the story behind Sudan Shines and how we're making a difference, one student at a time.</p>
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-headline font-semibold mb-8 text-center">Project Timeline</h2>
        <div className="relative wrap overflow-hidden p-2 md:p-10 h-full">
          <div className="border-2-2 absolute border-opacity-20 border-primary h-full border left-1/2 transform -translate-x-1/2 hidden md:block"></div>
          {timelineData.map((event, index) => (
            <TimelineEvent
              key={event.title}
              {...event}
              alignment={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-headline font-semibold mb-8 text-center">Voices from Our Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <Card key={testimonial.author} className="flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow p-6 rounded-lg">
               <Image src={testimonial.imageUrl} alt={testimonial.author} data-ai-hint={testimonial.imageHint} width={80} height={80} className="rounded-full mb-4 border-2 border-primary" />
              <blockquote className="italic text-foreground mb-4 flex-grow">&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <p className="font-semibold text-primary">- {testimonial.author}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="volunteer" className="py-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
        <div className="container text-center">
          <h2 className="text-3xl font-headline font-bold mb-6 text-primary-foreground">Join Us & Make an Impact</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Be a part of the movement to transform education in Sudan. Your support can change lives.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 group hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 rounded-lg">
              <CardHeader className="items-center p-2">
                <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <HandHeart className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors duration-300">Teach with Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-6 min-h-[40px]">Share your knowledge and inspire students as a volunteer teacher.</CardDescription>
                <Button asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 w-full sm:w-auto">
                  <Link href="/about/apply">Become a Teacher</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="p-6 group hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 rounded-lg">
              <CardHeader className="items-center p-2">
                <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <School className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors duration-300">Sponsor a School</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-6 min-h-[40px]">Help us provide resources and support to schools in need.</CardDescription>
                <Button className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 w-full sm:w-auto">Sponsor Now</Button>
              </CardContent>
            </Card>
            <Card className="p-6 group hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 rounded-lg">
              <CardHeader className="items-center p-2">
                <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                 <Laptop className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors duration-300">Donate Devices</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-6 min-h-[40px]">Provide students with the tools they need to access education.</CardDescription>
                <Button className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 w-full sm:w-auto">Donate Devices</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
