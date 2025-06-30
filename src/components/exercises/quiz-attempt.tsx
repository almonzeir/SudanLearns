"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const quizData = {
  title: 'Math Basics Quiz',
  questions: [
    {
      id: 'q1',
      text: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },
    {
      id: 'q2',
      text: 'What is 10 - 3?',
      options: ['6', '7', '8', '9'],
      correctAnswer: '7',
    },
    {
      id: 'q3',
      text: 'What is 5 * 3?',
      options: ['10', '12', '15', '20'],
      correctAnswer: '15',
    },
  ],
};

interface QuizAttemptProps {
    exerciseId: string;
}

export default function QuizAttempt({ exerciseId }: QuizAttemptProps) {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

  const handleSelectAnswer = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quizData.questions.forEach(q => {
        if(selectedAnswers[q.id] === q.correctAnswer) {
            correctCount++;
        }
    });
    setScore(correctCount);
    setQuizFinished(true);
    toast({
        title: "Quiz Submitted!",
        description: `You scored ${correctCount} out of ${quizData.questions.length}.`,
    });
  };

  if (quizFinished) {
      return (
          <Card className="w-full max-w-2xl mx-auto shadow-xl">
              <CardHeader>
                  <CardTitle className="text-2xl font-headline text-primary">Quiz Results</CardTitle>
                  <CardDescription>You have completed the {quizData.title}.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="text-center">
                      <p className="text-lg text-muted-foreground">Your Score:</p>
                      <p className="text-5xl font-bold text-foreground">{score} / {quizData.questions.length}</p>
                  </div>
              </CardContent>
              <CardFooter>
                 <Button onClick={() => window.location.reload()} className="w-full">Try Again</Button>
              </CardFooter>
          </Card>
      );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <div className="mb-4">
            <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {quizData.questions.length}</p>
            <Progress value={progress} className="w-full mt-1" />
        </div>
        <CardTitle className="text-2xl font-headline">{currentQuestion.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswers[currentQuestion.id]}
          onValueChange={(value) => handleSelectAnswer(currentQuestion.id, value)}
          className="space-y-4"
        >
          {currentQuestion.options.map(option => (
            <div key={option} className="flex items-center space-x-3 p-3 border rounded-md has-[:checked]:bg-secondary cursor-pointer">
              <RadioGroupItem value={option} id={`${currentQuestion.id}-${option}`} />
              <Label htmlFor={`${currentQuestion.id}-${option}`} className="text-base font-normal cursor-pointer w-full">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        {currentQuestionIndex === quizData.questions.length - 1 ? (
             <Button onClick={handleSubmit} disabled={!selectedAnswers[currentQuestion.id]}>
                Submit Quiz
             </Button>
        ) : (
            <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestion.id]}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
