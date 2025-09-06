import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputDescription } from "@/components/ui/input-description";

import db from "../../../../../../db.json";
import { verifyStudentIdentitySchema } from "@/lib/validations/auth";
import { useAction } from "next-safe-action/hooks";
import { verifyStudentIdentity } from "@/api/actions/auth";
import { Dispatch, SetStateAction } from "react";
import { ButtonWithLoader } from "@/components/button-with-loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function SchoolInfo({
  formIndex,
  setForm,
  setStudentData,
}: {
  formIndex: number;
  setForm: Dispatch<SetStateAction<number>>;
  setStudentData: Dispatch<SetStateAction<any>>;
}) {
  const {
    register,
    getValues,
    formState: { isDirty, isValid, errors },
    ...form
  } = useForm({
    mode: "all",
    resolver: zodResolver(verifyStudentIdentitySchema),
    defaultValues: {
      school: "",
      matNo: "",
    },
  });

  const { execute, hasErrored, result, isExecuting } = useAction(
    verifyStudentIdentity,
    {
      onSuccess: (data) => {
        toast.success("Student info verified!");
        setTimeout(() => {
          setStudentData(data);
          setForm(++formIndex);
        }, 1000);
      },
      onError(error) {
        toast.error("Student data not found");
        console.log(error);
      },
    }
  );

  return (
    <form
      className="w-full flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();

        execute(getValues());
      }}
    >
      {hasErrored && (
        <span className="text-danger font-semi-bold ">
          {result.serverError?.message}
        </span>
      )}
      <div className="flex flex-col gap-5">
        <FormField>
          <Label className="font-regular">Name of school*</Label>
          <Controller
            name="school"
            control={form.control}
            render={({ field, fieldState: { error } }) => (
              <>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select School" />
                  </SelectTrigger>
                  <SelectContent>
                    {db.schools.map((school) => (
                      <SelectItem key={school.name} value={school.name}>
                        {school.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <InputDescription
                  variant={error && "error"}
                  text={error?.message}
                />
              </>
            )}
          />
        </FormField>
        <FormField>
          <Label className="font-regular">Matriculation Number*</Label>
          <Input
            type="text"
            variant={errors.matNo && "error"}
            {...register("matNo")}
          />
          <InputDescription
            variant={errors.matNo && "error"}
            text={errors.matNo?.message}
          />
        </FormField>
        <div className="m-auto">
          <ButtonWithLoader
            isPending={isExecuting}
            disabled={!isValid || !isDirty || isExecuting}
          >
            Continue...
          </ButtonWithLoader>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}
