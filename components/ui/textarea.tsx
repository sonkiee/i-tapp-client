import * as React from "react";

import { cn } from "@/lib/utils/tw";
import { cva, VariantProps } from "class-variance-authority";

const textareaVariants = cva(
  "w-full rounded-[4px] border bg-white p-4 text-base ring-offset-white focus-visible:outline-none placeholder:text-grey-4 text-grey-2 disabled:cursor-not-allowed disabled:opacity-50 pb-0 min-h-[268px] resize-none",
  {
    variants: {
      variant: {
        default: "border-grey-5",
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

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
