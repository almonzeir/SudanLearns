import { PageWrapper } from '@/components/ui/page-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction } from 'lucide-react';
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
            <Construction className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="font-headline text-2xl sm:text-3xl text-primary">
              Feature Under Construction
            </CardTitle>
            <CardDescription className="text-base">
              The interface for <span className="font-semibold">{displayType.toLowerCase()}s</span> is being developed.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-foreground">
            <p>
              We are working hard to bring you an interactive experience for {displayType.toLowerCase()}s. Please check back soon!
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
