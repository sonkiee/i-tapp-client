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
import { createSpace } from "@/api/actions/auth";
import { createSpaceSchema } from "@/lib/validations/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddSpaceForm() {
  const form = useForm<z.infer<typeof createSpaceSchema>>({
    resolver: zodResolver(createSpaceSchema),
    defaultValues: {
      title: "",
      industry: "",
      level: "",
      state: "",
      city: "",
      address: "",
      description: "",
      duration: 3,
      // showAvailability: false,
    },
  });

  const { execute, isExecuting, result, hasErrored } = useAction(createSpace, {
    onSuccess(data) {
      toast.success("IT Space created successfully!");
      form.reset();
    },
    onError(error) {
      console.error("Error creating space", error);
      toast.error("Failed to create IT Space. Please try again.");
    },
  });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   execute(values);
  // }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create IT Space</h1>
        {hasErrored && (
          <span className="text-danger font-semi-bold ">
            {result.serverError?.message}
          </span>
        )}
        {/* <FormField
          control={form.control}
          name="showAvailability"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Show Availability</FormLabel>
                <FormDescription>
                  Display your availability on your space profile
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        /> */}
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            execute(form.getValues());
          }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
                    onValueChange={field.onChange}
                    // defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="3">1 -3 months</SelectItem>
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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

          <div className="xxs:text-start space-x-2">
            <Button
              type="submit"
              size="sm"
              disabled={isExecuting}
              className="mx-auto"
            >
              {isExecuting ? "Creating space..." : "Create Space"}
            </Button>
            <button
              type="button"
              onClick={() => form.reset()}
              disabled={isExecuting}
              className="p-3"
            >
              Clear
            </button>
          </div>
        </form>
      </Form>

      <ToastContainer />
    </div>
  );
}
