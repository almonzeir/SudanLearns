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
import { Laptop, Loader2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  address: z.string().min(10, {
      message: "Please enter a valid pickup address.",
  }),
  deviceType: z.string({
    required_error: "Please select a device type.",
  }),
  deviceCondition: z.string({
    required_error: "Please select the device's condition.",
  }),
  message: z.string().max(500, "Message must not exceed 500 characters.").optional(),
});

export default function DonateForm() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
        const response = await fetch("https://submit-form.com/CaDOFKO5k", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                ...values,
                formName: "Device Donation"
            }),
        });

        if (response.ok) {
            toast({
                title: "Thank You!",
                description: "Your donation has been registered. We will contact you shortly to arrange pickup.",
            });
            form.reset();
        } else {
            throw new Error("Form submission failed");
        }
    } catch (error) {
        console.error(error);
        toast({
            variant: "destructive",
            title: "Submission Error",
            description: "There was a problem registering your donation. Please try again.",
        });
    } finally {
        setIsLoading(false);
    }
  }
  
  return (
    <Card className="shadow-xl border-primary/20">
        <CardHeader>
            <CardTitle className="flex items-center text-2xl font-headline">
                <Laptop className="mr-3 h-7 w-7 text-primary" />
                Device Donation Form
            </CardTitle>
            <CardDescription>
                Fill out the form below to donate a device. We appreciate your support!
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
                                    <Input placeholder="e.g. Ahmed Ali" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="e.g. a.ali@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number (Optional)</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="e.g. +249..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pickup Address</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Please provide your full address for device pickup..."
                                        className="resize-none"
                                        rows={3}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>We will contact you to coordinate a convenient pickup time.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="deviceType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Device Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Select a device" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Laptop">Laptop</SelectItem>
                                            <SelectItem value="Tablet">Tablet</SelectItem>
                                            <SelectItem value="Smartphone">Smartphone</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="deviceCondition"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Device Condition</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="New">New (Unused)</SelectItem>
                                            <SelectItem value="Used - Good">Used (Good Condition)</SelectItem>
                                            <SelectItem value="Used - Fair">Used (Fair Condition)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Optional Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Any additional details about the device or pickup..."
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
                            "Register Donation"
                          )}
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
