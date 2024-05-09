"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { AddUser } from "@/types";
import { User } from "@/types";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddUserSchema, EditUserSchema } from "@/types/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface PropTypes {
  onChange: (() => void) | ((arg: any) => void);
  onSuccess: any;
  values?: User;
}

const Modal = ({ onChange, onSuccess, values }: PropTypes) => {
  const form = useForm<AddUser>({
    resolver: zodResolver(values ? EditUserSchema : AddUserSchema),
  });
  const onSubmit: SubmitHandler<AddUser> = (data) => {
    if (values) {
      onSuccess({ ...values, ...data });
    } else {
      onSuccess(data);
    }
  };

  useEffect(() => {
    if (values) {
      form.reset(values);
    }
  }, [form, values]);
  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!values && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="space-y-2">
              <Button className="w-full" type="submit">
                {values ? "Edit" : "Add"}
              </Button>
              <Button className="w-full" variant={"outline"} onClick={onChange}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

Modal.displayName = "Modal";

export default Modal;
