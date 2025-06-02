'use server';

/**
 * @fileOverview Generates a dynamic motivational quote for students based on their data.
 *
 * - generateDynamicQuote - A function that generates a dynamic quote.
 * - DynamicQuoteInput - The input type for the generateDynamicQuote function.
 * - DynamicQuoteOutput - The return type for the generateDynamicQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DynamicQuoteInputSchema = z.object({
  studentHistory: z
    .string()
    .describe('The student history, including completed courses and grades.'),
  currentEngagement: z
    .string()
    .describe('The current engagement level of the student on the platform.'),
  areasOfInterest: z.string().describe('The areas of interest of the student.'),
});

export type DynamicQuoteInput = z.infer<typeof DynamicQuoteInputSchema>;

const DynamicQuoteOutputSchema = z.object({
  quote: z.string().describe('A motivational and uplifting quote for the student.'),
});

export type DynamicQuoteOutput = z.infer<typeof DynamicQuoteOutputSchema>;

export async function generateDynamicQuote(input: DynamicQuoteInput): Promise<DynamicQuoteOutput> {
  return dynamicQuoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dynamicQuotePrompt',
  input: {schema: DynamicQuoteInputSchema},
  output: {schema: DynamicQuoteOutputSchema},
  prompt: `You are a motivational quote generator for students using the Sudan Learns platform.

  Generate a dynamic quote based on the student's history, current engagement, and areas of interest to uplift and motivate them.

  Student History: {{{studentHistory}}}
Current Engagement: {{{currentEngagement}}}
Areas of Interest: {{{areasOfInterest}}}
`,
});

const dynamicQuoteFlow = ai.defineFlow(
  {
    name: 'dynamicQuoteFlow',
    inputSchema: DynamicQuoteInputSchema,
    outputSchema: DynamicQuoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
