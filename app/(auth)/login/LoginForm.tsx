"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/types/zod";
import { userLogin } from "@/app/action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<LoginUser>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginUser> = async (data) => {
    try {
      const resData = await userLogin(data);
      if (resData?.message) {
        router.replace("dashboard");
        toast({
          title: "User Login Successful!!",
        });
      }
    } catch (error) {
      console.log(error, "ERROR");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          <Link href="/forgot-password" className="underline">
            Forgot your password?
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
