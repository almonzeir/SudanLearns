import ProjectTimelineClient from '@/components/about/project-timeline-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Sudan Shines',
  description: 'Learn about the mission, journey, and impact of Sudan Shines.',
};

export default function AboutPage() {
  return <ProjectTimelineClient />;
}
