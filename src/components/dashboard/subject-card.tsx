
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SubjectCardProps {
  title: string;
  icon: LucideIcon;
  colorClass?: string; // Tailwind color class e.g., 'text-blue-500'
  href: string;
}

export default function SubjectCard({ title, icon: Icon, colorClass = 'text-primary', href }: SubjectCardProps) {
  return (
    <Card className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium font-headline group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
        <Icon className={`h-8 w-8 ${colorClass} group-hover:scale-110 transition-transform duration-300`} />
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <p className="text-xs text-muted-foreground mb-4">
          Explore lessons, quizzes, and assignments for {title}.
        </p>
        <Button asChild variant="outline" size="sm" className="mt-auto w-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
          <Link href={href}>
            Go to {title} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
