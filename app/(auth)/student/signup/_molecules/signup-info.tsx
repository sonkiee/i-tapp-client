import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { studentSignup } from "@/api/actions/auth";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      console.log(error);
    },
  });

  const handleSignup = (data: Login) => {
    const old = studentData.data.data;
    const payLoad = { ...old, ...data };

    signupAction(payLoad);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {hasErrored && (
        <span className="text-danger font-semi-bold">
          {result.serverError?.message}
        </span>
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
                      <Input variant={errors.email && "error"} {...field} />
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
                      <Input
                        variant={errors.password && "error"}
                        isHiddenField
                        {...field}
                      />
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
                      <Input
                        variant={errors.confirmPassword && "error"}
                        isHiddenField
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="m-auto my-2">
            <ButtonWithLoader
              type="submit"
              isPending={isExecuting}
              disabled={!isDirty || !isValid}
            >
              Sign up
            </ButtonWithLoader>
          </div>
        </form>
      </Form>
      <ToastContainer />
    </div>
  );
}
