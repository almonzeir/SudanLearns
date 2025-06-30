import SponsorForm from '@/components/about/sponsor-form';
import { PageWrapper } from '@/components/ui/page-wrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sponsor Our Cause - Sudan Shines',
  description: 'Support our mission by sponsoring a student, a program, or by donating devices.',
};

export default function SponsorPage() {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-headline font-bold mb-2">Support Sudan Shines</h1>
          <p className="text-lg text-muted-foreground">Your contribution can make a world of difference. Choose how you want to help.</p>
        </div>
        <SponsorForm />
      </div>
    </PageWrapper>
  );
}
