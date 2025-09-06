"use client";

import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signinSchema } from "@/lib/validations/auth";
import { ButtonWithLoader } from "@/components/button-with-loader";
import { signinStudent, signinCompany } from "@/api/actions/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobal } from "@/context/GlobalContext";

export function CompanySignIn() {
  const { students, setStudents } = useGlobal();
  const [activeTab, setActiveTab] = useState("student"); // State to manage active tab
  const router = useRouter();

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isDirty, isValid, errors } = form.formState;
  const signInAction = activeTab === "student" ? signinStudent : signinCompany;

  const { execute, isExecuting, result, hasErrored } = useAction(signInAction, {
    onSuccess(data) {
      toast.success("Logged in successfully!");
      const userRole = data?.data?.user?.role;
      const user = data?.data?.user;
      const company = data?.data?.company;
      const accessToken = data?.data?.accessToken;

      localStorage.setItem("token", accessToken);
      if (userRole === "student") {
        router.push("/portal/find-it-space");
        localStorage.setItem("user", JSON.stringify(user));
        setStudents(user);
      } else {
        router.push("/portal/overview/dashboard");
        localStorage.setItem("company", JSON.stringify(company));
      }
    },
    onError(error) {
      toast.error("Failed to log in. Please try again.");
      console.error("Failed to log in:", error);
    },
  });

  return (
    <div className="w-full max-w-[350px] m-auto flex flex-col">
      <div className="flex justify-center gap-4 mb-4">
        {/* Tab buttons */}
        <button
          onClick={() => setActiveTab("student")}
          className={`py-2 px-4 ${
            activeTab === "student"
              ? "border-b-2 border-primary"
              : "text-gray-500"
          }`}
        >
          Student
        </button>
        <button
          onClick={() => setActiveTab("company")}
          className={`py-2 px-4 ${
            activeTab === "company"
              ? "border-b-2 border-primary"
              : "text-gray-500"
          }`}
        >
          Company
        </button>
      </div>

      <div className="flex flex-col gap-4 items-center mb-4">
        <h1 className="text-2xl font-bold ">
          {activeTab === "company" ? "Company Login" : "Student Login"}
        </h1>
        <p className="text-sm text-center">Welcome back</p>
      </div>

      {hasErrored && (
        <span className="text-danger font-semi-bold ">
          {result.serverError?.message}
        </span>
      )}

      <Form {...form}>
        <form
          className="my-4 flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            execute(form.getValues());
          }}
        >
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input variant={errors.email && "error"} {...field} />
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
                    <Input
                      variant={errors.password && "error"}
                      isHiddenField
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="m-auto my-2">
            <ButtonWithLoader
              type="submit"
              disabled={!isDirty || !isValid}
              isPending={isExecuting}
            >
              Sign In
            </ButtonWithLoader>
          </div>
        </form>
      </Form>
      <p className="text-sm text-center">
        Don't have an account yet?
        <Link href={`/${activeTab}/signup`} className="text-primary mx-1">
          Sign up
        </Link>
      </p>
      <ToastContainer />
    </div>
  );
}
