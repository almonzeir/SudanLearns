
import { PageWrapper } from '@/components/ui/page-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ExerciseDetailPageProps {
  params: {
    type: string;
    id: string;
  };
}

export default function ExerciseDetailPage({ params }: ExerciseDetailPageProps) {
  const { type, id } = params;

  // Capitalize the first letter of type for display
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
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl sm:text-3xl text-primary">
            {singularType} Details
          </CardTitle>
          <CardDescription className="text-base">
            Viewing details for {singularType.toLowerCase()} ID: <span className="font-semibold text-foreground">{id}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-foreground">
          <p className="mb-6">
            This is a placeholder page for the <span className="font-medium">{singularType.toLowerCase()}</span> with ID <span className="font-medium">&quot;{id}&quot;</span>.
          </p>
          <p className="mb-2">
            Full content, interactive elements, and specific instructions for this {singularType.toLowerCase()} will be available here in a future update.
          </p>
          <p>
            For now, you can return to the main exercises list to explore other available activities.
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
