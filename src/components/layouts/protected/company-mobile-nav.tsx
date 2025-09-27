"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "iconsax-reactjs";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navLinks } from "./company-header";
import { logout } from "@/actions/auth";
import { useCompanyStore } from "@/lib/store/company";

export function CompanyMobileNav() {
  const [open, setOpen] = useState<boolean>(false);
  const company = useCompanyStore((c) => c.company);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden">
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent className="w-full max-w-[300px] py-16 flex flex-col  gap-8 md:hidden">
        <Link href="/portal/profile">
          <div className="rounded-full border h-[50px] w-[50px]">
            <Image
              src={company.profileImageUrl || "/applicant.png"}
              alt="applicant"
              width={48}
              height={48}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <span className="pl-2">{company.name}</span>
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
