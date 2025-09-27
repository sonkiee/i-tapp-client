import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { ButtonWithLoader } from "@/components/button-with-loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { studentSignupSchema } from "@/lib/validations/auth";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { studentSignup } from "@/actions/auth";

type Login = {
  email: string;
  password: string;
};

export function SignupInfo({
  formIndex,
  setForm,
  studentData,
}: {
  formIndex: number;
  setForm: Dispatch<SetStateAction<number>>;
  studentData: any;
}) {
  const form = useForm<z.infer<typeof studentSignupSchema>>({
    mode: "all",
    resolver: zodResolver(studentSignupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isDirty, isValid, errors } = form.formState;

  const {
    execute: signupAction,
    hasErrored,
    result,
    isExecuting,
  } = useAction(studentSignup, {
    onSuccess(data) {
      toast.success("Sign up successful!");
      setTimeout(() => {
        setForm(++formIndex);
      }, 1000);
    },
    onError(error) {
      toast.error(" Error signing up");

      console.log(error?.error);
    },
  });

  const handleSignup = (data: Login) => {
    const old = studentData.data;
    const payLoad = { ...old, ...data };

    console.log("paypaload", payLoad);

    signupAction(payLoad);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {hasErrored && (
        <span className="text-danger font-semi-bold">{result.serverError}</span>
      )}
      <Form {...form}>
        <form
          className="my-4 flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();

            handleSignup(form.getValues());
          }}
        >
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
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
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <ButtonWithLoader
            type="submit"
            isPending={isExecuting}
            disabled={!isDirty || !isValid}
            className="w-full"
          >
            Sign up
          </ButtonWithLoader>
        </form>
      </Form>
    </div>
  );
}
