
import { PageWrapper } from '@/components/ui/page-wrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <PageWrapper className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-8rem)] py-16">
      <AlertTriangle className="w-20 h-20 sm:w-24 sm:h-24 text-primary mb-8" />
      <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-md px-4">
        Oops! The page you&apos;re looking for doesn&apos;t seem to exist. It might have been moved, deleted, or you might have mistyped the URL.
      </p>
      <Button asChild size="lg">
        <Link href="/">Go Back to Homepage</Link>
      </Button>
    </PageWrapper>
  );
}
