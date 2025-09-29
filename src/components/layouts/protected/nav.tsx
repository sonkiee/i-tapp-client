"use client";

import React from "react";
import Link from "next/link";
import {
  AddCircle,
  Element,
  Profile2User,
  BoxAdd,
  Briefcase,
} from "iconsax-reactjs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFetchCompanyJobs } from "@/hooks/query";
import { useCompanyStore } from "@/lib/store/company";
// import { Briefcase } from "lucide-react";

type Job = {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  createdDate: string;
  updatedDate: string;
  duration: number;
  industry: string;
  totalApplicants: number;
  acceptedApplicants: number;
  shortListedApplicants: number;
};

const sideNavLinks: {
  [key: string]: {
    icon?: React.ReactNode;
    text: string;
    href: string;
  }[];
} = {
  overview: [
    {
      icon: <Element />,
      text: "Dashboard",
      href: "/portal/overview/dashboard",
    },
    {
      icon: <Profile2User />,
      text: "Applicants",
      href: "/portal/overview/applicants",
    },
    {
      icon: <Briefcase />,
      text: "Opportunities",
      href: "/portal/overview/opportunities",
    },
  ],
  candidates: [
    {
      text: "Accepted",
      href: "/portal/candidates/accepted",
    },
    {
      text: "Shortlisted",
      href: "/portal/candidates/shortlisted",
    },
    {
      text: "Saved",
      href: "/portal/candidates/saved",
    },
  ],
};

export function Nav() {
  const selectedJob = useCompanyStore((state) => state.selectedJob);
  const setSelectedJob = useCompanyStore((state) => state.setSelectedJob);
  const pathname = usePathname();
  const parentRoute = pathname.split("/")[2];

  const { data } = useFetchCompanyJobs(); // API data
  const jobs: Job[] = data?.data || []; // ✅ extract correctly

  const handleJobClick = (job: Job) => {
    setSelectedJob(job); // put job in global context
  };

  return (
    <div className="hidden lg:flex">
      <nav>
        <ul className="flex flex-col gap-3">
          {sideNavLinks[parentRoute]?.map((link, index) => (
            <li
              key={index}
              className={cn(
                "text-[#282828] text-opacity-70 pl-5 w-[270px] pr-8 py-3 font-bold flex gap-6 text-base items-center",
                pathname === link.href &&
                  "text-primary bg-secondary border-l-4 border-primary text-opacity-100"
              )}
            >
              {link.icon} <Link href={link.href}>{link.text}</Link>
            </li>
          ))}

          {/* Space Section */}
          {parentRoute === "space" && (
            <>
              {jobs.length ? (
                <>
                  {jobs.map((job) => (
                    <li
                      key={job.id}
                      className={cn(
                        "text-[#282828] text-opacity-70 pl-5 w-[270px] pr-8 py-3 font-bold flex gap-6 text-base items-center",
                        pathname === `/portal/space/${job.id}` &&
                          "text-primary bg-secondary border-l-4 border-primary text-opacity-100"
                      )}
                    >
                      <BoxAdd />
                      <Link
                        href={`/portal/space/${job.id}`}
                        onClick={() => handleJobClick(job)}
                      >
                        Edit {job.title}
                      </Link>
                    </li>
                  ))}

                  {/* Add new space link */}
                  <li
                    className={cn(
                      "text-[#282828] text-opacity-70 pl-5 w-[270px] pr-8 py-3 font-bold flex gap-6 text-base items-center",
                      pathname === "/portal/space/add-new-space" &&
                        "text-primary bg-secondary border-l-4 border-primary text-opacity-100"
                    )}
                  >
                    <AddCircle />
                    <Link href="/portal/space/add-new-space">
                      Add new Space
                    </Link>
                  </li>
                </>
              ) : (
                <li
                  className={cn(
                    "text-[#282828] text-opacity-70 pl-5 w-[270px] pr-8 py-3 font-bold flex gap-6 text-base items-center",
                    pathname === "/portal/space/create-space" &&
                      "text-primary bg-secondary border-l-4 border-primary text-opacity-100"
                  )}
                >
                  <AddCircle />
                  <Link href="/portal/space/create-space">Create Space</Link>
                </li>
              )}
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
