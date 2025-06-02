
"use client";

import { useState } from 'react';
import { PageWrapper } from '@/components/ui/page-wrapper';
import SubjectCard from './subject-card';
import ProgressRing from './progress-ring';
import BadgeItem from './badge-item';
import DynamicQuoteDisplay from './dynamic-quote-display';
import { BookOpen, Calculator, FlaskConical, Globe, ScrollText, Lightbulb, Rocket, Award, Sparkles, Bot, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { askStudyHelper, type StudyHelperOutput } from '@/ai/flows/study-helper-flow';

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
  const [studyQuestion, setStudyQuestion] = useState("");
  const [studyAnswer, setStudyAnswer] = useState<StudyHelperOutput | null>(null);
  const [isStudyHelperLoading, setIsStudyHelperLoading] = useState(false);
  const [studyHelperError, setStudyHelperError] = useState<string | null>(null);

  const handleAskStudyHelper = async () => {
    if (!studyQuestion.trim()) return;
    setIsStudyHelperLoading(true);
    setStudyAnswer(null);
    setStudyHelperError(null);
    try {
      const result = await askStudyHelper({ question: studyQuestion });
      setStudyAnswer(result);
    } catch (err) {
      console.error("Failed to get help from Study Helper:", err);
      setStudyHelperError("Sorry, I couldn't get an answer right now. Please try again later.");
    } finally {
      setIsStudyHelperLoading(false);
    }
  };

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
          <Card className="bg-secondary/50 flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow">
            <CardHeader className="p-2 items-center">
              <CardTitle className="font-headline flex items-center text-2xl">
                <Bot className="mr-3 h-8 w-8 text-primary"/>
                Study Helper
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center w-full max-w-md">
              <Image
                src="https://placehold.co/150x150.png"
                alt="Study Helper Mascot"
                width={100}
                height={100}
                className="rounded-full mb-4 shadow-md border-2 border-primary"
                data-ai-hint="friendly robot"
              />
              <p className="text-muted-foreground mb-4">
                Need help or have a question? Ask our AI assistant!
              </p>
              <div className="w-full space-y-2 mb-4">
                <Textarea
                  placeholder="Type your question here..."
                  value={studyQuestion}
                  onChange={(e) => setStudyQuestion(e.target.value)}
                  rows={3}
                  disabled={isStudyHelperLoading}
                />
                <Button 
                  onClick={handleAskStudyHelper} 
                  disabled={isStudyHelperLoading || !studyQuestion.trim()} 
                  className="w-full"
                >
                  {isStudyHelperLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Asking...</>
                  ) : (
                    "Ask AI Helper"
                  )}
                </Button>
              </div>

              {studyHelperError && (
                <Alert variant="destructive" className="w-full text-left mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{studyHelperError}</AlertDescription>
                </Alert>
              )}

              {studyAnswer && !studyHelperError && (
                <Card className="w-full mt-4 p-4 text-left bg-background shadow-inner">
                  <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-md font-headline text-primary">AI Helper's Answer:</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm whitespace-pre-wrap">{studyAnswer.answer}</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </section>

      </div>
    </PageWrapper>
  );
}
