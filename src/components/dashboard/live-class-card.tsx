
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Radio, User, Clock } from 'lucide-react';
import Link from 'next/link';

export default function LiveClassCard() {
  return (
    <Card className="bg-gradient-to-br from-destructive/20 to-primary/10 border-destructive/50 shadow-xl overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-headline text-destructive-foreground">
          <div className="relative mr-3">
            <Radio className="h-7 w-7 text-destructive" />
            <span className="absolute top-0 right-0 flex h-3 w-3 -mt-0.5 -mr-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
            </span>
          </div>
          Live Class in Session
        </CardTitle>
        <CardDescription className="ml-10">A class is currently live. Join now to participate!</CardDescription>
      </CardHeader>
      <CardContent className="ml-10 space-y-3">
        <p className="font-bold text-2xl">Advanced Algebra</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <User className="mr-2 h-4 w-4" />
          <span>with Mr. Khalid</span>
        </div>
         <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          <span>Ends at 5:00 PM</span>
        </div>
      </CardContent>
      <CardFooter className="ml-10 pb-6 pt-4">
        <Button asChild size="lg" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground w-full sm:w-auto shadow-lg hover:scale-105 transition-transform">
            {/* This would eventually link to the live class page */}
            <Link href="#"> 
                Join Now
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
