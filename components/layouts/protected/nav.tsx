"use client";

import Link from "next/link";
import { AddCircle, Element, Profile2User, BoxAdd } from "iconsax-react";
import { usePathname } from "next/navigation";
import { useGlobal } from "@/context/GlobalContext";
import { cn } from "@/lib/utils";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  date: Date;
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
  const { companyJobs, setSelectedJob } = useGlobal();
  const pathname = usePathname();
  const parentRoute = pathname.split("/")[2];

  const handleJobClick = (job: Job) => {
    setSelectedJob(job); // Set the job details in context
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
                pathname == link.href &&
                  "text-primary bg-secondary border-l-4 border-primary text-opacity-100"
              )}
            >
              {link.icon} <Link href={link.href}>{link.text}</Link>
            </li>
          ))}

          {/* Space Section */}
          {parentRoute === "space" && (
            <>
              {/* Conditionally render based on whether there are jobs */}
              {companyJobs?.length ? (
                <>
                  {/* Render each job as an "Edit Space" link */}
                  {companyJobs.map((job: Job, index: number) => (
                    <li
                      key={index}
                      className={cn(
                        "text-[#282828] text-opacity-70 pl-5 w-[270px] pr-8 py-3 font-bold flex gap-6 text-base items-center",
                        pathname == `/portal/space/${job.id}` &&
                          "text-primary bg-secondary border-l-4 border-primary text-opacity-100"
                      )}
                    >
                      <BoxAdd />{" "}
                      {/* <Link href={`/portal/space/${job.id}`}>
                        Edit {job.title}
                      </Link> */}
                      <Link
                        href={`/portal/space/${job.id}`}
                        onClick={() => handleJobClick(job)}
                      >
                        Edit {job.title}
                      </Link>
                    </li>
                  ))}
                  {/* "Add new Space" link if jobs exist */}
                  <li
                    className={cn(
                      "text-[#282828] text-opacity-70 pl-5 w-[270px] pr-8 py-3 font-bold flex gap-6 text-base items-center",
                      pathname == "/portal/space/add-new-space" &&
                        "text-primary bg-secondary border-l-4 border-primary text-opacity-100"
                    )}
                  >
                    <AddCircle />{" "}
                    <Link href="/portal/space/add-new-space">
                      Add new Space
                    </Link>
                  </li>
                </>
              ) : (
                /* Render "Create Space" if no jobs exist */
                <li
                  className={cn(
                    "text-[#282828] text-opacity-70 pl-5 w-[270px] pr-8 py-3 font-bold flex gap-6 text-base items-center",
                    pathname == "/portal/space/create-space" &&
                      "text-primary bg-secondary border-l-4 border-primary text-opacity-100"
                  )}
                >
                  <AddCircle />{" "}
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
