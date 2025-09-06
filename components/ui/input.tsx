"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeSlash } from "iconsax-react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex items-center gap-2 w-full rounded-[4px] border bg-white p-3 text-base ring-offset-white focus-visible:outline-none placeholder:text-grey-4 text-grey-2 disabled:cursor-not-allowed disabled:opacity-50 [&input]:disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-grey-4",
        warning: "border-warning",
        error: "border-danger",
        success: "border-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  isHiddenField?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      type,
      endAdornment,
      startAdornment,
      isHiddenField,
      ...props
    },
    ref
  ) => {
    const [showValue, setShowValue] = React.useState<boolean>(false);

    return (
      <div className={cn(inputVariants({ className, variant }))}>
        {startAdornment && <span>{startAdornment}</span>}
        <input
          type={showValue ? "text" : isHiddenField ? "password" : type}
          ref={ref}
          className="outline-none focus:outline-none w-full bg-transparent placeholder:text-[#B5B7C0]"
          {...props}
        />
        {endAdornment && <span>{endAdornment}</span>}
        {isHiddenField && (
          <button type="button" onClick={() => setShowValue(!showValue)}>
            {showValue ? (
              <Eye size={18} className="cursor-pointer text-grey-2" />
            ) : (
              <EyeSlash size={18} className="cursor-pointer text-grey-2" />
            )}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
