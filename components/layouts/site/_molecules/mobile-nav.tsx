"use client";

import Link from "next/link";
import { Menu } from "iconsax-react";
import { useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { app } from "@/config/app";

export function MobileNav() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden">
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent className="w-full max-w-[300px] py-16 flex flex-col justify-center gap-8 md:hidden">
        <nav className="flex flex-col gap-3">
          {app.nav_links.map((link) => (
            <Link
              key={link.text}
              href={link.href}
              title={link.title}
              className="text-base text-black"
              onClick={() => setOpen(false)}
            >
              {link.text}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Link
            href={app.links.signin}
            className={buttonVariants({ variant: "outline", size: "sm" })}
            onClick={() => setOpen(false)}
          >
            Sign In
          </Link>
          <Link
            href={app.links.signup}
            className={buttonVariants({ size: "sm" })}
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
