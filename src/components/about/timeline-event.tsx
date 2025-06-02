import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TimelineEventProps {
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageHint?: string;
  alignment?: 'left' | 'right';
}

export default function TimelineEvent({ date, title, description, imageUrl, imageHint, alignment = 'left' }: TimelineEventProps) {
  return (
    <div className={`mb-8 flex justify-between items-center w-full ${alignment === 'left' ? 'flex-row-reverse' : ''}`}>
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full md:w-12 md:h-12">
        <div className="mx-auto text-primary-foreground font-semibold text-sm md:text-lg"></div> {/* Placeholder for icon or year */}
      </div>
      <Card className={`order-1 w-5/12 px-6 py-4 shadow-xl hover:shadow-2xl transition-shadow duration-300 ${alignment === 'left' ? 'text-right' : 'text-left'}`}>
        <CardHeader className="p-0 mb-2">
          <p className="text-sm text-muted-foreground">{date}</p>
          <CardTitle className="text-xl font-headline">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <CardDescription>{description}</CardDescription>
          {imageUrl && (
            <div className={`mt-4 ${alignment === 'left' ? 'ml-auto' : 'mr-auto'} w-full max-w-xs rounded-lg overflow-hidden shadow-md`}>
              <Image
                src={imageUrl}
                alt={title}
                width={300}
                height={200}
                className="object-cover w-full"
                data-ai-hint={imageHint}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
