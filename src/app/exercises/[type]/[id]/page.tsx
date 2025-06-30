import { PageWrapper } from '@/components/ui/page-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, FileText } from 'lucide-react';
import QuizAttempt from '@/components/exercises/quiz-attempt';
import AssignmentAttempt from '@/components/exercises/assignment-attempt';

interface ExerciseDetailPageProps {
  params: {
    type: string;
    id: string;
  };
}

const renderContent = (type: string, id: string) => {
    const singularType = type.endsWith('s') ? type.slice(0, -1) : type;
    const displayType = singularType.charAt(0).toUpperCase() + singularType.slice(1);

  switch (type) {
    case 'quizzes':
      return <QuizAttempt exerciseId={id} />;
    
    case 'assignments':
      return <AssignmentAttempt exerciseId={id} />;
    
    case 'exams':
      return (
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="items-center text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
                <FileText className="h-12 w-12 text-primary" />
                <Clock className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl sm:text-3xl text-primary">
              Exams Feature Coming Soon!
            </CardTitle>
            <CardDescription className="text-base">
              The interface for timed exams is currently under development.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-foreground">
            <p>
              We're building a robust system for timed exams with automatic grading. This feature will be available in a future update. Please check back later!
            </p>
          </CardContent>
        </Card>
      );
      
    default:
      return (
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl sm:text-3xl text-primary">
              Unknown Exercise Type
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-foreground">
            <p>Content for this exercise type is not available.</p>
          </CardContent>
        </Card>
      );
  }
};

export default function ExerciseDetailPage({ params }: ExerciseDetailPageProps) {
  const { type, id } = params;

  return (
    <PageWrapper>
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/exercises">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Exercises
          </Link>
        </Button>
      </div>
      {renderContent(type, id)}
    </PageWrapper>
  );
}

export async function generateMetadata({ params }: ExerciseDetailPageProps) {
  const { type, id } = params;
  const displayType = type.charAt(0).toUpperCase() + type.slice(1);
  const singularType = displayType.endsWith('s') ? displayType.slice(0, -1) : displayType;
  return {
    title: `${singularType} ${id} - Sudan Shines`,
    description: `Complete ${singularType.toLowerCase()} ${id} on Sudan Shines.`,
  };
}
