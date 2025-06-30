import DonateForm from '@/components/about/donate-form';
import { PageWrapper } from '@/components/ui/page-wrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate Devices - Sudan Shines',
  description: 'Support our mission by donating devices to students in need.',
};

export default function DonatePage() {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-headline font-bold mb-2">Donate a Device</h1>
          <p className="text-lg text-muted-foreground">Your old devices can get a new life and empower a student's education.</p>
        </div>
        <DonateForm />
      </div>
    </PageWrapper>
  );
}
