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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Heart, Loader2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  sponsorshipType: z.string({
    required_error: "Please select a sponsorship type.",
  }),
  amount: z.coerce.number().min(5, {
    message: "Minimum sponsorship amount is $5.",
  }),
  message: z.string().max(500, {
    message: "Message must not be longer than 500 characters."
  }).optional(),
});

export default function SponsorForm() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        console.log("Sponsorship Form Submitted:", values);
        // Simulate backend payment processing
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Thank you for your generosity!",
                description: "Your sponsorship has been processed. A confirmation has been sent to your email.",
            });
            form.reset();
        }, 2000);
    }

    const setAmount = (value: number) => {
        form.setValue("amount", value, { shouldValidate: true });
    };

    return (
        <Card className="shadow-xl border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center text-2xl font-headline">
                    <Heart className="mr-3 h-7 w-7 text-primary" />
                    Sponsorship Form
                </CardTitle>
                <CardDescription>
                    Your support helps us provide quality education to children in Sudan.
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
                                        <Input placeholder="e.g. Yusuf Mohamed" {...field} />
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
                                        <Input type="email" placeholder="e.g. yusuf@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sponsorshipType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sponsorship Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a type of sponsorship" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="student">Sponsor a Student</SelectItem>
                                            <SelectItem value="program">Sponsor a School Program</SelectItem>
                                            <SelectItem value="general">General Donation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Choose how you'd like to direct your support.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sponsorship Amount (USD)</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input type="number" placeholder="50" {...field} className="pl-8" />
                                        </div>
                                    </FormControl>
                                    <div className="flex gap-2 pt-2">
                                        <Button type="button" variant="outline" size="sm" onClick={() => setAmount(25)}>$25</Button>
                                        <Button type="button" variant="outline" size="sm" onClick={() => setAmount(50)}>$50</Button>
                                        <Button type="button" variant="outline" size="sm" onClick={() => setAmount(100)}>$100</Button>
                                        <Button type="button" variant="outline" size="sm" onClick={() => setAmount(250)}>$250</Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Optional Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Leave a message of encouragement..."
                                            className="resize-none"
                                            rows={4}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                             {isLoading ? (
                                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                              ) : (
                                "Proceed to Secure Payment"
                              )}
                        </Button>
                         <p className="text-xs text-center text-muted-foreground">
                            This is a demonstration. No real payment will be processed.
                        </p>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
