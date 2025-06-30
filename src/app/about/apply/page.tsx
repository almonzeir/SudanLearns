import ApplyForm from '@/components/about/apply-form';
import { PageWrapper } from '@/components/ui/page-wrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a Teacher - Sudan Shines',
  description: 'Apply to become a volunteer teacher and make a difference.',
};

export default function ApplyPage() {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-headline font-bold mb-2">Join Our Teaching Team</h1>
          <p className="text-lg text-muted-foreground">Share your knowledge and inspire the next generation of leaders in Sudan.</p>
        </div>
        <ApplyForm />
      </div>
    </PageWrapper>
  );
}
