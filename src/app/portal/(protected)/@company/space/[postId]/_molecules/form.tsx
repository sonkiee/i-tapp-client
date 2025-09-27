"use client";

import React from "react";
import { useForm } from "react-hook-form";

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
import { useGlobal } from "@/context/GlobalContext";
import { useAction } from "next-safe-action/hooks";
// import { updateSpace } from "@/api/actions/auth";
import { toast } from "react-toastify";
import { updateSpace } from "@/actions/company";

export function UpdateSpaceForm() {
  const { selectedJob } = useGlobal();
  const form = useForm({
    defaultValues: {
      id: selectedJob.id,
      title: selectedJob.title,
      industry: selectedJob.industry,
      state: selectedJob.state,
      level: selectedJob.level,
      city: selectedJob.city,
      address: selectedJob.address,
      description: selectedJob.description,
      duration: selectedJob.duration,
      bio: selectedJob.bio,
    },
  });

  const { execute, isExecuting, result, hasErrored } = useAction(updateSpace, {
    onSuccess(data) {
      toast.success("IT Space updated successfully!");
    },
    onError(error) {
      console.error("Error updating space", error);
      toast.error("Failed to update IT Space. Please try again.");
    },
  });

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-h6">Update IT Space</h1>

        <span>Show/Hide availability</span>
      </div>
      {hasErrored && (
        <span className="text-danger font-semi-bold ">
          {result.serverError}
        </span>
      )}

      <div>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(form.getValues());
              execute(form.getValues());
            }}
          >
            <div className="flex gap-4 flex-wrap max-w border-t-2 border-[#E0E4EC] pt-4">
              <div className="flex flex-col gap-4 w-80">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
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
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex flex-col gap-4 w-80">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>State </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex my-4">
              <div className="flex flex-col w-[444px]">
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
              </div>
            </div>
            <div className="xxs:text-start space-x-2">
              <Button
                type="submit"
                size="sm"
                disabled={isExecuting}
                className="mx-auto"
              >
                {isExecuting ? "Updating space..." : "Update Space"}
              </Button>
              <button type="button" className="p-3">
                Clear
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
