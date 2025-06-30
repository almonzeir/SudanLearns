
"use client";

import { PageWrapper } from '@/components/ui/page-wrapper';
import TimelineEvent from './timeline-event';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HandHeart, School, Laptop, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const timelineData = [
  { date: '2023 - Q1', title: 'Project Inception', description: 'The idea for Sudan Shines was born, aiming to bridge the educational gap in underserved regions of Sudan.', imageUrl: 'https://placehold.co/300x200.png', imageHint: "idea lightbulb" },
  { date: '2023 - Q3', title: 'Platform Development Begins', description: 'A dedicated team of volunteers started building the Sudan Shines online learning platform.', imageUrl: 'https://placehold.co/300x200.png', imageHint: "team collaboration" },
  { date: '2024 - Q1', title: 'Pilot Program Launch', description: 'Successfully launched a pilot program in two rural communities, providing access to 100+ students.', imageUrl: 'https://placehold.co/300x200.png', imageHint: "students learning" },
  { date: '2024 - Q2', title: 'Content Expansion', description: 'Added new courses and subjects based on feedback from the pilot program, expanding our curriculum.', imageUrl: 'https://placehold.co/300x200.png', imageHint: "online course" },
  { date: 'Future', title: 'Nationwide Reach', description: 'Our vision is to expand Sudan Shines to reach every child in Sudan, empowering a generation through education.', imageUrl: 'https://placehold.co/300x200.png', imageHint: "Sudan children" },
];

const teamMembers = [
    {
        name: "Almonzer Hamid Sarray Abdallah",
        role: "Leader & Page Developer",
        imageUrl: "https://placehold.co/150x150.png",
        imageHint: "male portrait developer",
        isLeader: true,
    },
    {
        name: "Abdullahi Mohamed Ali",
        role: "Organizer (AIU22102225, Somalia)",
        imageUrl: "https://placehold.co/150x150.png",
        imageHint: "male portrait organizer",
    },
    {
        name: "Anas Ismail Ahmed",
        role: "Organizer (AIU 22102251)",
        imageUrl: "https://placehold.co/150x150.png",
        imageHint: "male portrait student",
    },
    {
        name: "Modou Lamin Kinteh",
        role: "Organizer",
        imageUrl: "https://placehold.co/150x150.png",
        imageHint: "male portrait",
    },
    {
        name: "Reem Bekdash",
        role: "Organizer",
        imageUrl: "https://placehold.co/150x150.png",
        imageHint: "female portrait",
    },
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
        <h2 className="text-3xl font-headline font-semibold mb-12 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {teamMembers.slice(0, 3).map(member => (
             <Card key={member.name} className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-border/50">
               <div className="relative">
                <Image src={member.imageUrl} alt={member.name} data-ai-hint={member.imageHint} width={120} height={120} className="rounded-full mb-4 border-4 border-primary/50" />
                {member.isLeader && (
                    <Badge className="absolute top-0 right-0 -mr-2 text-xs py-1 px-3">
                        <Star className="w-3 h-3 mr-1"/>
                        Leader
                    </Badge>
                )}
               </div>
              <CardTitle className="text-xl font-headline mb-1">{member.name}</CardTitle>
              <CardDescription>{member.role}</CardDescription>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center mt-8 lg:w-2/3 mx-auto">
             {teamMembers.slice(3).map(member => (
             <Card key={member.name} className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-border/50">
               <div className="relative">
                <Image src={member.imageUrl} alt={member.name} data-ai-hint={member.imageHint} width={120} height={120} className="rounded-full mb-4 border-4 border-primary/50" />
               </div>
              <CardTitle className="text-xl font-headline mb-1">{member.name}</CardTitle>
              <CardDescription>{member.role}</CardDescription>
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
                <Button asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 w-full sm:w-auto">
                  <Link href="/about/sponsor">Sponsor Now</Link>
                </Button>
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
                <Button asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 w-full sm:w-auto">
                  <Link href="/about/donate">Donate Devices</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
