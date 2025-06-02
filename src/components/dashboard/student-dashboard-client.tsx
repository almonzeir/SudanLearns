"use client";

import { PageWrapper } from '@/components/ui/page-wrapper';
import SubjectCard from './subject-card';
import ProgressRing from './progress-ring';
import BadgeItem from './badge-item';
import DynamicQuoteDisplay from './dynamic-quote-display';
import { BookOpen, Calculator, FlaskConical, Globe, ScrollText, Lightbulb, Rocket, Award, Sparkles, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const subjects = [
  { title: 'Mathematics', icon: Calculator, colorClass: 'text-blue-500', href: '/exercises#quizzes', progress: 75 },
  { title: 'Science', icon: FlaskConical, colorClass: 'text-green-500', href: '/exercises#assignments', progress: 50 },
  { title: 'English', icon: BookOpen, colorClass: 'text-red-500', href: '/videos', progress: 90 },
  { title: 'History', icon: ScrollText, colorClass: 'text-yellow-600', href: '/videos', progress: 30 },
  { title: 'Geography', icon: Globe, colorClass: 'text-purple-500', href: '/videos', progress: 60 },
];

const badges = [
  { name: 'Curious Learner', icon: Lightbulb, description: 'Asked 10 questions in live sessions.' },
  { name: 'Fast Finisher', icon: Rocket, description: 'Completed 5 quizzes ahead of time.' },
  { name: 'Star Student', icon: Award, description: 'Achieved 90%+ in 3 subjects.' },
  { name: 'Perfect Attendance', icon: Sparkles, description: 'Attended all live classes for a month.', achieved: false },
];

export default function StudentDashboardClient() {
  return (
    <PageWrapper>
      <div className="space-y-8">
        <DynamicQuoteDisplay />

        <section>
          <h2 className="text-3xl font-headline font-semibold mb-6">Your Subjects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <SubjectCard key={subject.title} title={subject.title} icon={subject.icon} colorClass={subject.colorClass} href={subject.href} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-headline font-semibold mb-6">Overall Progress</h2>
          <Card>
            <CardContent className="pt-6 flex flex-col sm:flex-row items-center justify-around gap-6">
              <div className="flex flex-col items-center">
                <ProgressRing percentage={65} size={150} strokeWidth={12} />
                <p className="mt-2 text-muted-foreground">Total Completion</p>
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <p className="text-lg"><span className="font-semibold">Courses in Progress:</span> 3</p>
                <p className="text-lg"><span className="font-semibold">Courses Completed:</span> 2</p>
                <p className="text-lg"><span className="font-semibold">Next Milestone:</span> Complete Science 101</p>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-3xl font-headline font-semibold mb-6">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {badges.map((badge) => (
              <BadgeItem key={badge.name} name={badge.name} icon={badge.icon} description={badge.description} achieved={badge.achieved} />
            ))}
          </div>
        </section>

        <section>
          <Card className="bg-secondary/50">
            <CardHeader>
              <CardTitle className="font-headline flex items-center">
                <Bot className="mr-2 h-6 w-6 text-primary"/>
                Study Helper
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Need help or have a question? Our AI mascot is here to assist you! (Feature coming soon)</p>
            </CardContent>
          </Card>
        </section>

      </div>
    </PageWrapper>
  );
}
