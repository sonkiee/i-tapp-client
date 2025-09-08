"use client";

import Link from "next/link";
import { ProfileAdd, ArrowRight } from "iconsax-react";
import { OverviewBox } from "@/components/overview-box";
import { ApplicantCard } from "../../../../../../../components/applicant-card";
import { useGlobal } from "@/context/GlobalContext";
import { useEffect, useState } from "react";
import { Applicant } from "@/types";

export function Dashboard() {
  const {
    totalApplicants,
    acceptedApplicants,
    shortlistedApplicants,
    company,
    setCompany,
  } = useGlobal();

  useEffect(() => {
    const storedCompany = JSON.parse(localStorage.getItem("company") || "{}");
    setCompany(storedCompany);
  }, [setCompany]);

  return (
    <div className="flex flex-col gap-4">
      <h5 className="text-h6">
        Hello <span className="uppercase">{company.name}</span>
      </h5>
      <p className=" text-grey-3">This is the overview of your activities</p>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <OverviewBox
          title="Total"
          number={totalApplicants[1] || 0}
          icon={<ProfileAdd />}
          link={"/portal/overview/applicants"}
        />
        <OverviewBox
          title="Shortedlisted"
          number={shortlistedApplicants[1] || 0}
          icon={<ProfileAdd />}
          link={"/portal/candidates/shortlisted"}
        />
        <OverviewBox
          title="Accepted"
          number={acceptedApplicants[1] || 0}
          icon={<ProfileAdd />}
          link={"/portal/candidates/accepted"}
        />
      </div>
      <div>
        <div className="flex justify-between my-5">
          <span>Recent Applicants</span>
          <Link href="/portal/overview/applicants" className="flex mr-14 gap-2">
            <span>See all</span>
            <ArrowRight size={24} color="#292D32" />
          </Link>
        </div>
        <div>
          {totalApplicants?.[0]
            ?.slice(0, 5)
            .map((applicant: Applicant, index: number) => (
              <ApplicantCard key={index} applicant={applicant} />
            ))}
        </div>
      </div>
    </div>
  );
}
