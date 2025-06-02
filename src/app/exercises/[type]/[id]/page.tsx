
import { PageWrapper } from '@/components/ui/page-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ClipboardList } from 'lucide-react';

interface ExerciseDetailPageProps {
  params: {
    type: string;
    id: string;
  };
}

export default function ExerciseDetailPage({ params }: ExerciseDetailPageProps) {
  const { type, id } = params;

  const displayType = type.charAt(0).toUpperCase() + type.slice(1);
  const singularType = displayType.endsWith('s') ? displayType.slice(0, -1) : displayType;


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
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <div className="flex items-center mb-2">
            <ClipboardList className="mr-3 h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-2xl sm:text-3xl text-primary">
              {singularType} Details
            </CardTitle>
          </div>
          <CardDescription className="text-base ml-11">
            You are viewing details for {singularType.toLowerCase()} ID: <span className="font-semibold text-foreground">{id}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-foreground">
          <p className="mb-6">
            This page provides a dedicated space for the <span className="font-medium">{singularType.toLowerCase()}</span> with ID <span className="font-medium">&quot;{id}&quot;</span>.
          </p>
          <p className="mb-2">
            Interactive elements, specific instructions, and the full content for this {singularType.toLowerCase()} will be available here soon. We are working hard to bring you the best learning experience!
          </p>
          <p>
            In the meantime, feel free to return to the main exercises list to explore other activities.
          </p>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}

export async function generateMetadata({ params }: ExerciseDetailPageProps) {
  const { type, id } = params;
  const displayType = type.charAt(0).toUpperCase() + type.slice(1);
  const singularType = displayType.endsWith('s') ? displayType.slice(0, -1) : displayType;
  return {
    title: `${singularType} ${id} - Sudan Shines`,
    description: `Details for ${singularType.toLowerCase()} ${id} on Sudan Shines.`,
  };
}
