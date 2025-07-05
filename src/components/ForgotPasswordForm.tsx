import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const redirectUrl = `${window.location.origin}/reset-password`;

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setIsSubmitted(true);
        toast({
          title: "Password Reset Email Sent",
          description: "Please check your email for a link to reset your password.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto grid w-[350px] gap-6 bg-white p-8 rounded-lg shadow-lg">
      
      {isSubmitted ? (
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold text-blue-800">Email Sent</h1>
          <p className="text-balance text-gray-600">
            A password reset link has been sent to <strong>{form.getValues('email')}</strong>.
            Please check your inbox.
          </p>
          <div className="mt-4 text-center text-sm">
            <Link to="/login" className="underline text-blue-600 hover:text-blue-500">
              Back to Login
            </Link>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold text-blue-800">Forgot Password</h1>
              <p className="text-balance text-gray-600">
                Enter your email to get a password reset link.
              </p>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      {...field}
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
            <div className="mt-4 text-center text-sm">
              Remember your password?{" "}
              <Link to="/login" className="underline text-blue-600 hover:text-blue-500">
                Login
              </Link>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
