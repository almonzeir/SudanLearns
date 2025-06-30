"use client";

import { useState } from 'react';
import { PageWrapper } from '@/components/ui/page-wrapper';
import SubjectCard from './subject-card';
import ProgressRing from './progress-ring';
import BadgeItem from './badge-item';
import DynamicQuoteDisplay from './dynamic-quote-display';
import LiveClassCard from './live-class-card';
import { BookOpen, Calculator, FlaskConical, Globe, ScrollText, Lightbulb, Rocket, Award, Sparkles, Bot, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
      <div className="space-y-12"> {/* Increased spacing between sections */}
        <DynamicQuoteDisplay />

        <section>
          <LiveClassCard />
        </section>

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
          <Card className="bg-gradient-to-tr from-card to-secondary/20 shadow-lg border border-border/50">
            <CardContent className="pt-8 pb-8 flex flex-col sm:flex-row items-center justify-around gap-8 sm:gap-12">
              <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                <ProgressRing percentage={65} size={150} strokeWidth={12} />
                <p className="mt-3 text-sm font-medium text-muted-foreground">Total Completion</p>
              </div>
              <div className="space-y-3 text-center sm:text-left">
                <p className="text-lg"><span className="font-semibold text-foreground">Courses in Progress:</span> <span className="text-primary font-bold text-xl">3</span></p>
                <p className="text-lg"><span className="font-semibold text-foreground">Courses Completed:</span> <span className="text-primary font-bold text-xl">2</span></p>
                <p className="text-lg"><span className="font-semibold text-foreground">Next Milestone:</span> <span className="text-accent-foreground font-medium">Complete Science 101</span></p>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-3xl font-headline font-semibold mb-6">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {badges.map((badge) => (
              <BadgeItem key={badge.name} name={badge.name} icon={badge.icon} description={badge.description} achieved={badge.achieved} />
            ))}
          </div>
        </section>

        <section id="ai-study-helper">
          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-primary/20 flex flex-col items-center text-center p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300 rounded-lg">
            <CardHeader className="p-2 items-center mb-4">
                <Bot className="h-20 w-20 text-primary mb-4" />
                <CardTitle className="font-headline text-3xl sm:text-4xl text-primary">
                    AI Study Helper
                </CardTitle>
                <CardDescription className="text-lg text-accent-foreground max-w-md mx-auto mt-2">
                    Stuck on a problem or have a question? Ask our friendly AI assistant for help!
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center w-full max-w-lg">
              <div className="w-full space-y-3 mb-6">
                <Textarea
                  placeholder="For example: 'Can you explain photosynthesis in simple terms?'"
                  value={studyQuestion}
                  onChange={(e) => setStudyQuestion(e.target.value)}
                  rows={3}
                  disabled={isStudyHelperLoading}
                  className="text-base focus:border-primary"
                />
                <Button 
                  onClick={handleAskStudyHelper} 
                  disabled={isStudyHelperLoading || !studyQuestion.trim()} 
                  className="w-full text-base py-3 h-auto bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:shadow-md transform hover:scale-[1.02]"
                  size="lg"
                >
                  {isStudyHelperLoading ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Asking...</>
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
                <Card className="w-full mt-6 p-4 text-left bg-background/80 shadow-inner border border-border rounded-lg">
                  <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-md font-headline text-primary flex items-center">
                       <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
                      AI Helper's Answer:
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm whitespace-pre-wrap text-foreground/90">{studyAnswer.answer}</p>

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
