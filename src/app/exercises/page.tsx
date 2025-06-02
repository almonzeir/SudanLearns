import ExerciseZoneClient from '@/components/exercises/exercise-zone-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exercise Zone - Sudan Shines',
  description: 'Access quizzes, assignments, and exams to test your knowledge.',
};

export default function ExercisesPage() {
  return <ExerciseZoneClient />;
}
