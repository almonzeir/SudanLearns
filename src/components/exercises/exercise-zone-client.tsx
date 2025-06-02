"use client";

import { PageWrapper } from '@/components/ui/page-wrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Edit3, FileText, ListChecks } from 'lucide-react';
import Link from 'next/link';

const exerciseItems = {
  quizzes: [
    { id: 'q1', title: 'Math Basics Quiz', subject: 'Mathematics', completed: true, score: '9/10' },
    { id: 'q2', title: 'Science Facts Challenge', subject: 'Science', completed: false },
    { id: 'q3', title: 'English Grammar Test', subject: 'English', completed: true, score: '15/20' },
  ],
  assignments: [
    { id: 'a1', title: 'Algebra Problem Set', subject: 'Mathematics', dueDate: '2024-08-15', submitted: true },
    { id: 'a2', title: 'Lab Report: Photosynthesis', subject: 'Science', dueDate: '2024-08-20', submitted: false },
  ],
  exams: [
    { id: 'e1', title: 'Mid-term Mathematics Exam', subject: 'Mathematics', date: '2024-09-01', upcoming: true },
    { id: 'e2', title: 'Final English Literature Exam', subject: 'English', date: '2024-09-15', upcoming: true },
  ],
};

const renderExerciseList = (items: any[], type: string) => (
  <div className="space-y-4">
    {items.length > 0 ? items.map(item => (
      <Card key={item.id} className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-headline flex justify-between items-center">
            {item.title}
            {item.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
            {item.upcoming && <span className="text-xs text-blue-500 font-medium">UPCOMING</span>}
          </CardTitle>
          <CardDescription>{item.subject} {item.score && `| Score: ${item.score}`} {item.dueDate && `| Due: ${item.dueDate}`} {item.date && `| Date: ${item.date}`}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant={item.completed || item.submitted ? "secondary" : "default"} size="sm" asChild>
            <Link href={`/exercises/${type}/${item.id}`}>
              {item.completed || item.submitted ? 'View Details' : `Start ${type.slice(0, -1)}`}
            </Link>
          </Button>
        </CardContent>
      </Card>
    )) : <p className="text-muted-foreground">No {type} available at the moment.</p>}
  </div>
);


export default function ExerciseZoneClient() {
  return (
    <PageWrapper>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold mb-2">Exercise Zone</h1>
        <p className="text-lg text-muted-foreground">Test your knowledge and complete assignments.</p>
      </div>

      <Tabs defaultValue="quizzes" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6">
          <TabsTrigger value="quizzes" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <ListChecks className="mr-2 h-5 w-5" /> Quizzes
          </TabsTrigger>
          <TabsTrigger value="assignments" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Edit3 className="mr-2 h-5 w-5" /> Assignments
          </TabsTrigger>
          <TabsTrigger value="exams" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FileText className="mr-2 h-5 w-5" /> Exams
          </TabsTrigger>
        </TabsList>
        <TabsContent value="quizzes">
          {renderExerciseList(exerciseItems.quizzes, 'quizzes')}
        </TabsContent>
        <TabsContent value="assignments">
          {renderExerciseList(exerciseItems.assignments, 'assignments')}
        </TabsContent>
        <TabsContent value="exams">
          {renderExerciseList(exerciseItems.exams, 'exams')}
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}
