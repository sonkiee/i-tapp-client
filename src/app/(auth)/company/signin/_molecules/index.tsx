"use client";

import React from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ButtonWithLoader } from "@/components/button-with-loader";

import { signinSchema } from "@/lib/validations/auth";
import { signinCompany } from "@/actions/auth";
import { useCompanyStore } from "@/lib/store/company";

export function CompanySignIn() {
  const router = useRouter();
  const setCompany = useCompanyStore((s) => s.setCompany);

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const { execute, isExecuting, hasErrored, result } = useAction(
    signinCompany,
    {
      onSuccess(data) {
        const user = data?.data?.user;
        const profile = data?.data?.profile;
        setCompany({ ...user, ...profile });

        toast.success("Welcome back!");
        router.push("/portal/overview/dashboard");
      },
      onError(error) {
        toast.error(error?.error?.serverError ?? "Login failed. Try again.");
        console.error("Login failed:", error);
      },
    }
  );

  return (
    <div className="w-full max-w-[350px] mx-auto flex flex-col">
      <div className="flex flex-col gap-2 items-center mb-6">
        <h1 className="text-2xl font-bold">Company Login</h1>
        <p className="text-sm text-muted-foreground">Welcome back</p>
      </div>

      {hasErrored && (
        <p className="text-red-500 text-sm font-medium mb-2 text-center">
          {result?.serverError ?? "Something went wrong. Please try again."}
        </p>
      )}

      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit((values) => execute(values))}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ButtonWithLoader
            type="submit"
            disabled={!form.formState.isValid}
            isPending={isExecuting}
            className="w-full"
          >
            Sign In
          </ButtonWithLoader>
        </form>
      </Form>

      <p className="text-sm text-center mt-6">
        Don&apos;t have an account yet?{" "}
        <Link href="/company/signup" className="text-primary font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}
