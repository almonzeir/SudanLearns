
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Clock, Edit3, FileText, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';

// This is a simplified version of the type, adjust as needed
export interface Exercise {
  id: string;
  type: 'quizzes' | 'assignments' | 'exams';
  title: string;
  subject: string;
  status: 'Completed' | 'Not Started' | 'Submitted' | 'Upcoming' | 'Graded' | 'Overdue';
  score?: string;
  dueDate?: string;
  date?: string;
}

const typeDetails = {
  quizzes: { icon: ListChecks, color: 'text-blue-500' },
  assignments: { icon: Edit3, color: 'text-orange-500' },
  exams: { icon: FileText, color: 'text-red-500' },
};

const statusDetails = {
    'Completed': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: CheckCircle },
    'Graded': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: CheckCircle },
    'Submitted': { color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200', icon: CheckCircle },
    'Not Started': { color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
    'Upcoming': { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', icon: Clock },
    'Overdue': { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', icon: Clock },
};


export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const { icon: Icon, color } = typeDetails[exercise.type];
  const { color: statusColor, icon: StatusIcon } = statusDetails[exercise.status] || {};
  
  const isActionable = exercise.status === 'Not Started' || exercise.status === 'Overdue';
  const buttonText = isActionable ? `Start ${exercise.type.slice(0, -1)}` : 'View Details';

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200 border-border/70 hover:border-primary/50">
      <CardHeader className="flex-row items-start gap-4 space-y-0 pb-4">
        <div className="p-3 bg-muted rounded-lg">
           <Icon className={cn("h-6 w-6", color)} />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg font-headline leading-tight">{exercise.title}</CardTitle>
          <CardDescription>{exercise.subject}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <Badge variant="outline" className={cn("font-medium", statusColor)}>
            {StatusIcon && <StatusIcon className="mr-1.5 h-3 w-3" />}
            {exercise.status}
        </Badge>
        
        {exercise.score && (
          <p className="text-sm font-medium text-foreground">Score: <span className="text-primary font-bold">{exercise.score}</span></p>
        )}

        {(exercise.dueDate || exercise.date) && (
            <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>
                    {exercise.type === 'assignments' && `Due: ${exercise.dueDate}`}
                    {exercise.type === 'exams' && `Date: ${exercise.date}`}
                </span>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild size="sm" className="w-full group" variant={isActionable ? 'default' : 'secondary'}>
          <Link href={`/exercises/${exercise.type}/${exercise.id}`}>
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
