"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Notification } from "iconsax-reactjs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Logo } from "@/components/logo";
import { Wrapper } from "@/components/wrapper";
import { MobileNav } from "./mobile-nav";
import { useGlobal } from "@/context/GlobalContext";
import { cn } from "@/lib/utils";

export const navLinks: { text: string; href: string }[] = [
  {
    text: "Find IT space",
    href: "/portal/find-it-space",
  },
  {
    text: "My IT Space",
    href: "/portal/my-it-space",
  },
  {
    text: "My Applications",
    href: "/portal/my-application",
  },
  {
    text: "Saved Applications",
    href: "/portal/saved-applications",
  },
];

export function Header() {
  const pathname = usePathname();
  const { student } = useGlobal();
  const parentRoute = pathname.split("/")[2];

  return (
    <header className="w-full fixed px-4 top-0 bg-white border-b z-10 border-grey-5">
      <Wrapper className="flex items-center h-16 justify-between py-6! md:px-0 touch:px-0">
        <Link href="/portal/find-it-space">
          <Logo />
        </Link>
        {/* Navigation Links */}
        <nav className="items-center gap-14 hidden md:flex">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "border-b-4 border-transparent text-sm text-primary pb-3",
                link.href.includes(parentRoute) && "border-primary text-black"
              )}
            >
              {link.text}
            </Link>
          ))}
        </nav>
        {/* Action Buttons */}
        <div className="hidden md:flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Notification
                  size={44}
                  className=" border border-[#C9C9DA] rounded-full p-2"
                />
              </TooltipTrigger>
              <TooltipContent className="px-0">
                <p className="px-6 py-5 border-b border-black flex items-center gap-2">
                  <Notification
                    size={24}
                    className=" border border-[#C9C9DA] rounded-full p-2"
                  />
                  You&apos;ve just been accepted by Chenotech Nigeria Limited
                </p>
                <p className="px-6 py-5 border-b border-black flex items-center gap-2">
                  <Notification
                    size={24}
                    className=" border border-[#C9C9DA] rounded-full p-2"
                  />
                  You&apos;ve just been accepted by Chenotech Nigeria Limited
                </p>
                <Link href="/portal/notifications">
                  <p className="px-10 py-2">See all notifications</p>
                </Link>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Link href="/portal/profile">
            <div className="rounded-full border h-[50px] w-[50px]">
              <Image
                src={student?.profileImageUrl || "/applicant.png"}
                alt="applicant"
                className="object-cover w-full h-full rounded-full"
                width={50}
                height={50}
              />
            </div>
          </Link>
        </div>

        {/* Mobile Nav */}
        <MobileNav />
      </Wrapper>
    </header>
  );
}
