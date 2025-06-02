'use server';
/**
 * @fileOverview Provides a study helper AI flow for students.
 *
 * - askStudyHelper - A function that takes a student's question and returns an AI-generated answer.
 * - StudyHelperInput - The input type for the askStudyHelper function.
 * - StudyHelperOutput - The return type for the askStudyHelper function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudyHelperInputSchema = z.object({
  question: z.string().describe('The question asked by the student.'),
});
export type StudyHelperInput = z.infer<typeof StudyHelperInputSchema>;

const StudyHelperOutputSchema = z.object({
  answer: z.string().describe('The helpful answer provided by the AI study assistant.'),
});
export type StudyHelperOutput = z.infer<typeof StudyHelperOutputSchema>;

export async function askStudyHelper(input: StudyHelperInput): Promise<StudyHelperOutput> {
  return studyHelperFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studyHelperPrompt',
  input: {schema: StudyHelperInputSchema},
  output: {schema: StudyHelperOutputSchema},
  prompt: `You are a friendly, patient, and encouraging AI study helper for students on the Sudan Shines educational platform.
Your goal is to assist students with their learning by answering their questions clearly and simply.
Use straightforward language suitable for students in primary and secondary school in Sudan.
If a question is outside your knowledge or inappropriate, politely state that you cannot answer it.
Always be positive and motivational.

Student's Question:
{{{question}}}

Provide a helpful answer:`,
});

const studyHelperFlow = ai.defineFlow(
  {
    name: 'studyHelperFlow',
    inputSchema: StudyHelperInputSchema,
    outputSchema: StudyHelperOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      return { answer: "I'm sorry, I encountered a problem trying to answer your question. Please try asking again." };
    }
    return output;
  }
);
