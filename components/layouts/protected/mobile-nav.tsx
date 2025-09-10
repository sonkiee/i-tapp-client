"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "iconsax-react";
import { useState } from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navLinks } from "./header";
// import { logout } from "@/actions/auth";

export function MobileNav() {
  const [open, setOpen] = useState<boolean>(false);

  const { students, student } = useGlobal();
  const name = student.firstName + " " + student.lastName;

  const handleLogout = () => {
    // logout("");
    window.location.href = "/";
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden">
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent className="w-full max-w-[300px] py-16 flex flex-col  gap-8 md:hidden">
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
