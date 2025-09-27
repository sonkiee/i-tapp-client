"use client";
import React from "react";
import usePaginator from "@/hooks/use-paginator";
import { SitePagination } from "@/components/ui/site-pagination";
import { ApplicantCard } from "@/components/applicant-card";
import { Applicant } from "@/types";
import { useFetchAllCompanyApplications } from "@/hooks/query";

export function AcceptedApplicants() {
  const { data, isLoading } = useFetchAllCompanyApplications();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // ✅ Correctly extract from API response
  const acceptedApplicants = data?.data?.acceptedApplicants || [[], 0];
  const acceptedList: Applicant[] = acceptedApplicants[0]; // array of applicants
  const acceptedCount: number = acceptedApplicants[1]; // total count

  // ✅ Pass only the list into paginator
  const { applications, setCurrentPage, postPerPage, currentPage, paginate } =
    usePaginator(6, acceptedList);

  return (
    <div>
      <p className="mb-4">Accepted Applicants</p>

      {applications?.map((applicant: Applicant, index: number) => (
        <ApplicantCard
          key={index}
          applicant={{ ...applicant, accepted: true }}
        />
      ))}

      <SitePagination
        totalPosts={acceptedCount}
        postsPerPage={postPerPage}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
