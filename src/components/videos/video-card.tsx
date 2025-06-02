
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle } from 'lucide-react';

interface VideoCardProps {
  title: string;
  subject: string;
  grade: string;
  youtubeVideoId: string;
  duration: string;
  colorCodeClass?: string; // e.g. bg-yellow-500
  onPlay: (videoId: string, title: string) => void;
}

export default function VideoCard({ title, subject, grade, youtubeVideoId, duration, colorCodeClass = 'bg-primary', onPlay }: VideoCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`;

  return (
    <Card 
      className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-primary"
      onClick={() => onPlay(youtubeVideoId, title)}
    >
      <CardHeader className="p-0 relative">
        <Image
          src={thumbnailUrl}
          alt={title}
          width={400}
          height={225}
          className="w-full h-auto object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
        />
        <div className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${colorCodeClass} text-primary-foreground shadow-sm`}>
          {grade}
        </div>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-headline mb-1 leading-tight group-hover:text-primary transition-colors">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{subject}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Badge variant="secondary">{duration}</Badge>
      </CardFooter>
    </Card>
  );
}
