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
import { HandHeart, Loader2 } from "lucide-react";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subjects: z.string().min(3, {
    message: "Please list at least one subject.",
  }),
  bio: z.string().min(20, {
    message: "Bio must be at least 20 characters.",
  }).max(500, {
    message: "Bio must not be longer than 500 characters."
  }),
  cv: z
    .any()
    .refine((files) => files?.[0], "A CV file is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only .pdf, .doc, and .docx formats are supported."
    ),
});

export default function ApplyForm() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subjects: "",
      bio: "",
      cv: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate backend submission
    console.log("Form Submitted:", values);
    setTimeout(() => {
        setIsLoading(false);
        toast({
            title: "Application Received!",
            description: "Thank you for your interest. We will review your application and get back to you soon.",
        });
        form.reset();
    }, 1500);
  }
  
  return (
    <Card className="shadow-xl border-primary/20">
        <CardHeader>
            <CardTitle className="flex items-center text-2xl font-headline">
                <HandHeart className="mr-3 h-7 w-7 text-primary" />
                Teacher Application
            </CardTitle>
            <CardDescription>
                Please fill out the form below to apply. All fields are required.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Fatima Al-Amin" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="e.g. fal-amin@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="subjects"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject(s) of Expertise</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Mathematics, English, Science" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please list the subjects you are comfortable teaching.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Short Bio & Motivation</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little about yourself and why you want to teach with Sudan Shines..."
                                        className="resize-none"
                                        rows={5}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="cv"
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                                <FormLabel>Upload CV/Resume</FormLabel>
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
                                    Please upload your CV (PDF, DOC, DOCX - Max 5MB).
                                 </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                         {isLoading ? (
                            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</>
                          ) : (
                            "Submit Application"
                          )}
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
