import VideoLibraryClient from '@/components/videos/video-library-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Library - Sudan Shines',
  description: 'Browse educational videos on various subjects and grade levels.',
};

export default function VideosPage() {
  return <VideoLibraryClient />;
}
