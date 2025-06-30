
"use client";

import { PageWrapper } from '@/components/ui/page-wrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit3, FileText, ListChecks } from 'lucide-react';
import ExerciseCard, { type Exercise } from './exercise-card';

const exerciseItems: Exercise[] = [
  // Quizzes
  { id: 'q1', type: 'quizzes', title: 'Math Basics Quiz', subject: 'Mathematics', status: 'Completed', score: '9/10' },
  { id: 'q2', type: 'quizzes', title: 'Science Facts Challenge', subject: 'Science', status: 'Not Started' },
  { id: 'q3', type: 'quizzes', title: 'English Grammar Test', subject: 'English', status: 'Graded', score: '15/20' },
  { id: 'q4', type: 'quizzes', title: 'World History Trivia', subject: 'History', status: 'Overdue' },

  // Assignments
  { id: 'a1', type: 'assignments', title: 'Algebra Problem Set', subject: 'Mathematics', status: 'Submitted', dueDate: '2024-08-15' },
  { id: 'a2', type: 'assignments', title: 'Lab Report: Photosynthesis', subject: 'Science', status: 'Not Started', dueDate: '2024-08-20' },
  { id: 'a3', type: 'assignments', title: 'Essay: The Great Gatsby', subject: 'English', status: 'Graded', dueDate: '2024-08-10', score: 'A-' },
  { id: 'a4', type: 'assignments', title: 'Geography Research Project', subject: 'Geography', status: 'Overdue', dueDate: '2024-08-01' },

  // Exams
  { id: 'e1', type: 'exams', title: 'Mid-term Mathematics Exam', subject: 'Mathematics', status: 'Upcoming', date: '2024-09-01' },
  { id: 'e2', type: 'exams', title: 'Final English Literature Exam', subject: 'English', status: 'Upcoming', date: '2024-09-15' },
  { id: 'e3', type: 'exams', title: 'Final Science Exam', subject: 'Science', status: 'Upcoming', date: '2024-09-18' },
];

const renderExerciseList = (items: Exercise[], type: 'quizzes' | 'assignments' | 'exams') => {
  const filteredItems = items.filter(item => item.type === type);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.length > 0 ? filteredItems.map(item => (
        <ExerciseCard key={item.id} exercise={item} />
      )) : <p className="text-muted-foreground col-span-full text-center py-8">No {type} available at the moment.</p>}
    </div>
  );
};


export default function ExerciseZoneClient() {
  return (
    <PageWrapper>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold mb-2">Exercise Zone</h1>
        <p className="text-lg text-muted-foreground">Test your knowledge and complete your assignments.</p>
      </div>

      <Tabs defaultValue="quizzes" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8 h-auto p-1.5">
          <TabsTrigger value="quizzes" className="py-2.5 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <ListChecks className="mr-2 h-5 w-5" /> Quizzes
          </TabsTrigger>
          <TabsTrigger value="assignments" className="py-2.5 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Edit3 className="mr-2 h-5 w-5" /> Assignments
          </TabsTrigger>
          <TabsTrigger value="exams" className="py-2.5 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FileText className="mr-2 h-5 w-5" /> Exams
          </TabsTrigger>
        </TabsList>
        <TabsContent value="quizzes">
          {renderExerciseList(exerciseItems, 'quizzes')}
        </TabsContent>
        <TabsContent value="assignments">
          {renderExerciseList(exerciseItems, 'assignments')}
        </TabsContent>
        <TabsContent value="exams">
          {renderExerciseList(exerciseItems, 'exams')}
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}
