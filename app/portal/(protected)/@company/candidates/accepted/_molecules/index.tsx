"use client";

import usePaginator from "@/lib/hooks/use-paginator";
import { SitePagination } from "@/components/ui/site-pagination";
import { ApplicantCard } from "@/components/applicant-card";

import { useGlobal } from "@/context/GlobalContext";
import { Applicant } from "@/types";

export function AcceptedApplicants() {
  const { selectedApplicant, setSelectedApplicant, acceptedApplicants } =
    useGlobal();

  const applicants: Applicant[] = Array.from({ length: 10 });

  const { applications, setCurrentPage, postPerPage, currentPage, paginate } =
    usePaginator(6, acceptedApplicants);

  console.log(acceptedApplicants);
  return (
    <div>
      <p className="mb-4">Accepted Applicants</p>
      {acceptedApplicants?.[0]
        ?.slice(0, 5)
        .map((applicant: Applicant, index: number) => (
          <ApplicantCard
            key={index}
            applicant={{ ...applicant, accepted: true }}
          />
        ))}
      <SitePagination
        totalPosts={acceptedApplicants.length}
        postsPerPage={postPerPage}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
