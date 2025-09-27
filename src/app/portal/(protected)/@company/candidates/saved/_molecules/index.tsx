"use client";

import usePaginator from "@/hooks/use-paginator";
import { SitePagination } from "@/components/ui/site-pagination";
import { ApplicantCard } from "@/components/applicant-card";

import { useGlobal } from "@/context/GlobalContext";
// Define the type for Applicant
type Applicant = {
  name: string;
  university: string;
  id: string;
  accepted: boolean;

  student: {
    id: string;
    firstName: string;
    lastName: string;
    school: string;
    email: string;
    profileImageUrl: string;
  };
};

export function SavedApplicants() {
  const { totalApplicants } = useGlobal();
  const applicants: {}[] = Array.from({ length: 10 });

  const { applications, setCurrentPage, postPerPage, currentPage, paginate } =
    usePaginator(6, applicants);

  return (
    <div>
      <p className="mb-4">Saved Applicants</p>
      {totalApplicants?.[0]
        ?.slice(0, 5)
        .map((applicant: Applicant, index: number) => (
          <ApplicantCard key={index} applicant={applicant} />
        ))}
      <SitePagination
        totalPosts={applicants.length}
        postsPerPage={postPerPage}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
