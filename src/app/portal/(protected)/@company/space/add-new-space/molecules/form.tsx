"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAction } from "next-safe-action/hooks";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createSpaceSchema } from "@/lib/validations/auth";
import { createSpace } from "@/actions/company";
import { toast } from "react-toastify";

export function AddSpaceForm() {
  const jobSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    industry: z.string(),
    level: z.string(),
    state: z.string(),
    city: z.string(),
    address: z.string(),
    description: z.string(),
    duration: z.number(),
  });

  type JobFormValues = z.infer<typeof jobSchema>;

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      industry: "",
      level: "",
      state: "",
      city: "",
      address: "",
      description: "",
      duration: 0,
    },
  });

  const { execute, isExecuting, result, hasErrored } = useAction(createSpace, {
    onSuccess() {
      toast.success("IT Space created successfully!");
      form.reset();
    },
    onError(error) {
      console.error("Error creating space", error);
      toast.error(error?.error?.serverError || "Failed to create IT Space.");
    },
  });

  const onSubmit = (values: z.infer<typeof createSpaceSchema>) => {
    execute(values);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create IT Space</h1>
        {hasErrored && (
          <span className="text-red-600 font-semibold">
            {result.serverError}
          </span>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter IT space title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Beginner, Intermediate"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IT Duration</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="3">1 - 3 months</SelectItem>
                      <SelectItem value="6">3 - 6 months</SelectItem>
                      <SelectItem value="12">6 - 12 months</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Tech, Finance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter state" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe this internship opportunity"
                    className="h-20 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-3">
            <Button
              type="submit"
              size="sm"
              disabled={isExecuting}
              className="mx-auto"
            >
              {isExecuting ? "Creating space..." : "Create Space"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isExecuting}
              size="sm"
            >
              Clear
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
