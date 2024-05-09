"use client";

import { forgotPassword } from "@/app/action";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FrogotPass } from "@/types";
import { ForgotPassSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<FrogotPass>({ resolver: zodResolver(ForgotPassSchema) });
  const onSubmit: SubmitHandler<FrogotPass> = async (data) => {
    try {
      router.push("/login");
      toast({
        title: "Reset password link sent to your registered email.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong!!",
      });
    }
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.dow@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Email Password Reset Link
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
