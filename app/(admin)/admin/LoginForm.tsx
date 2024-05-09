"use client";
import { LoginUser } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/app/action";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/types/zod";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<LoginUser>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginUser> = async (data) => {
    const { error, success } = await adminLogin(data);
    if (success) {
      toast({
        title: success,
      });
      console.log(success, "success");
      router.push("admin/users");
    }
    if (error) {
      toast({
        variant: "destructive",
        title: "Error!!",
        description: error,
      });
    }
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Admin Login</CardTitle>
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
};

export default LoginForm;
