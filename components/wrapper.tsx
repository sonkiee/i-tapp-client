import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

export function Wrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <section
      className={cn(
        "w-full max-w-[1440px] px-6 sm:px-8 md:px-[80px] touch:px-[118px] m-auto py-20 sm:py-[102px]",
        className
      )}
    >
      {children}
    </section>
  );
}
