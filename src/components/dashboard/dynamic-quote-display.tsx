"use client";

import { useEffect, useState } from 'react';
import { generateDynamicQuote, type DynamicQuoteOutput } from '@/ai/flows/dynamic-quote-generator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DynamicQuoteDisplay() {
  const [quoteOutput, setQuoteOutput] = useState<DynamicQuoteOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuote() {
      try {
        setLoading(true);
        setError(null);
        // Placeholder data for the AI model
        const studentData = {
          studentHistory: "Completed Math 101 (Grade A), English 101 (Grade B). Currently enrolled in Science 101.",
          currentEngagement: "Active daily. Completed 5 quizzes this week. Watched 3 new video lessons.",
          areasOfInterest: "Technology, Space Exploration, Creative Writing.",
        };
        const result = await generateDynamicQuote(studentData);
        setQuoteOutput(result);
      } catch (err) {
        console.error("Failed to generate dynamic quote:", err);
        setError("Could not load a motivational quote at this time. Keep shining!");
      } finally {
        setLoading(false);
      }
    }
    fetchQuote();
  }, []);

  return (
    <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-headline text-primary-foreground">
          <Sparkles className="mr-2 h-6 w-6 text-primary" />
          Your Daily Inspiration
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {error && (
          <p className="text-destructive-foreground flex items-center">
            <AlertCircle className="mr-2 h-5 w-5"/> {error}
          </p>
        )}
        {quoteOutput && !loading && !error && (
          <blockquote className="text-lg italic text-foreground">
            &ldquo;{quoteOutput.quote}&rdquo;
          </blockquote>
        )}
      </CardContent>
    </Card>
  );
}
