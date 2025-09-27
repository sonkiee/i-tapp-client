"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "iconsax-reactjs";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navLinks } from "./header";
import { logout } from "@/actions/auth";
import { useStudentStore } from "@/lib/store/student";
// import { logout } from "@/actions/auth";

export function MobileNav() {
  const [open, setOpen] = useState<boolean>(false);
  const student = useStudentStore((s) => s.student);

  const name = student?.firstName + " " + student?.lastName;

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden">
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent className="w-full bg-white max-w-[300px] py-16 flex flex-col gap-8 md:hidden">
        <Link href="/portal/profile">
          <div className="">
            <div className="rounded-full border h-[50px] w-[50px]">
              <Image
                src={student?.profileImageUrl || "/applicant.png"}
                alt="applicant"
                className="object-cover w-full h-full rounded-full"
                width={50}
                height={50}
              />
            </div>
            <span className="pl-2">{name}</span>
          </div>
        </Link>

        <nav className="flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.text}
              href={link.href}
              className="text-base text-black"
              onClick={() => setOpen(false)}
            >
              {link.text}
            </Link>
          ))}
          <div>
            <Button onClick={handleLogout} type="submit">
              Logout
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
