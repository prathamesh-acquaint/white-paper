"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FormStepOneTypes } from "@/types";
import { FromStep1Schema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { contentTypeOptions } from "@/constants";
import { InfoIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const Form1 = () => {
  const [radioValue, setRadioValue] = useState("");
  const form = useForm<FormStepOneTypes>({
    resolver: zodResolver(FromStep1Schema),
  });

  const onSubmit: SubmitHandler<FormStepOneTypes> = (data) => {
    const oldData = JSON.parse(localStorage.getItem("formData") as string);
    localStorage.setItem("formData", JSON.stringify({ ...oldData, ...data }));
    localStorage.setItem("radioValue1", JSON.stringify(radioValue));
    // onChange();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John doe" {...field} />
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
                <Input
                  type="text"
                  placeholder="john.doe@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contentType"
          render={({ field }) => (
            <FormItem className="mt-2">
              <div className="flex gap-2 items-center">
                <FormLabel>Select Content Type</FormLabel>
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer">
                    <InfoIcon size={15} />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    The React Framework created and maintained by @vercel.
                  </HoverCardContent>
                </HoverCard>
              </div>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option." />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypeOptions?.map((item, idx) => (
                      <SelectItem key={idx} value={item?.value}>
                        {item?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input placeholder="Biology" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Checkbox
              id="web"
              value={"website"}
              name="webOrComp"
              onClick={() => setRadioValue("website")}
              checked={radioValue === "website"}
            />
            <label
              htmlFor="web"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Website URL
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox
              id="desc"
              value={"companyDesc"}
              name="webOrComp"
              onClick={() => setRadioValue("companyDesc")}
              checked={radioValue === "companyDesc"}
            />
            <label
              htmlFor="desc"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Company Description
            </label>
          </div>
        </div>
        {radioValue === "website" && (
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Webiste</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.google.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {radioValue === "companyDesc" && (
          <FormField
            control={form.control}
            name="companyDesc"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    aria-placeholder="Desc..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
};

export default Form1;
