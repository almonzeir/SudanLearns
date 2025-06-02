import StudentDashboardClient from '@/components/dashboard/student-dashboard-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Dashboard - Sudan Shines',
  description: 'Your personal learning space on Sudan Shines.',
};

export default function DashboardPage() {
  return <StudentDashboardClient />;
}
