"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileUp, Paperclip, CalendarDays } from "lucide-react";

// Dummy data for an assignment
const assignmentData = {
    title: "Algebra Problem Set",
    description: "Please complete all problems in the attached document. Show your work for all calculations. Submissions should be in PDF, DOC, or DOCX format.",
    dueDate: "2024-08-15",
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const formSchema = z.object({
  submissionFile: z
    .any()
    .refine((files) => files?.length > 0, "A file is required for submission.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only .pdf, .doc, and .docx formats are supported."
    ),
    notes: z.string().max(500, "Notes must not exceed 500 characters.").optional(),
});

interface AssignmentAttemptProps {
  exerciseId: string;
}

export default function AssignmentAttempt({ exerciseId }: AssignmentAttemptProps) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      submissionFile: undefined,
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate backend submission
    console.log("Assignment Submitted:", values);
    setTimeout(() => {
        setIsLoading(false);
        toast({
            title: "Assignment Submitted!",
            description: "Your work has been submitted successfully. Your teacher will be notified.",
        });
        form.reset();
    }, 1500);
  }
  
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
            <CardTitle className="font-headline text-2xl sm:text-3xl text-primary flex items-center">
                <Paperclip className="mr-3 h-7 w-7" />
                {assignmentData.title}
            </CardTitle>
            <CardDescription className="flex items-center text-sm pt-2">
                <CalendarDays className="mr-2 h-4 w-4" />
                Due Date: {assignmentData.dueDate}
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="text-foreground/90">
                <p>{assignmentData.description}</p>
            </div>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 border-t pt-6">
                     <FormField
                        control={form.control}
                        name="submissionFile"
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold">Upload Your Work</FormLabel>
                                <FormControl>
                                    <Input
                                        {...fieldProps}
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(event) =>
                                          onChange(event.target.files && event.target.files)
                                        }
                                    />
                                </FormControl>
                                 <FormDescription>
                                    Please upload your assignment (PDF, DOC, DOCX - Max 10MB).
                                 </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold">Optional Notes for Your Teacher</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Add any comments or notes about your submission..."
                                        className="resize-none"
                                        rows={3}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                         {isLoading ? (
                            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</>
                          ) : (
                            <><FileUp className="mr-2 h-5 w-5" /> Submit Assignment</>
                          )}
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
