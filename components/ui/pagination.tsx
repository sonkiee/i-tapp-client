import * as React from "react";
import { MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils/tw";

const Pagination = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn(
      "mx-auto flex w-full justify-center sm:justify-end mt-10",
      className
    )}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-3", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  isActive?: boolean;
  size?: string;
};

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "px-3 py-1.5 rounded-[5px]",
      isActive
        ? " bg-primary border text-white border-primary"
        : "bg-[#F5F5F5] border border-[#EEEEEE]",
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  size,
  ...props
}: PaginationLinkProps) => (
  <PaginationLink
    aria-label="Go to previous page"
    size={size}
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    {"<"}
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, size, ...props }: PaginationLinkProps) => (
  <PaginationLink
    aria-label="Go to next page"
    size={size}
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    &gt;
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
