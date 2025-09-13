"use client";

import React, { useState } from "react";
import FilterCompanies from "./filter";
import { Wrapper } from "@/components/wrapper";
import Results from "./results";
import { filters } from "@/config/student";
import { Filter } from "iconsax-reactjs";
import AvailableCompanyDetails from "./available-company-details";
import { cn } from "@/utils/tailwind";
import Modal from "@/components/ui/modal";
import ApplicationForm from "./form";
import { useFetchJobs } from "@/hooks/query";

export default function FindITSpace({ searchParams }) {
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [filter, setFilter] = useState(filters);
  const [filterActive, setFilterActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // ✅ fetch jobs via TanStack Query
  const { data: jobs, isLoading, error } = useFetchJobs();

  // Flatten + normalize the jobs list
  const companyList = jobs?.data?.flat() || [];
  const companyDetail = companyList.find((company) => company.id === companyId);

  if (isLoading) {
    return <p className="text-center">Loading jobs...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Failed to load jobs.</p>;
  }

  return (
    <Wrapper
      className={cn(
        "touch:px-5 bg-[#F0F0F5] max-w-full flex flex-col justify-center md:flex-row md:justify-between mt-4 sm:py-20 sm:pb-10 md:px-10 gap-x-4",
        companyId && "touch:pr-0 md:pr-0"
      )}
    >
      {/* Filter toggle (mobile) */}
      {companyId === null && (
        <div className="sm:hidden text-center mb-4">
          <div
            className="bg-white inline-block p-1 rounded border border-black"
            onClick={() => setFilterActive(true)}
          >
            <Filter className="inline mr-2" />
            <span>filter</span>
          </div>
        </div>
      )}

      {/* Main content */}
      <div
        className={cn(
          "flex justify-center gap-x-8 md:w-9/12",
          companyId && "hidden md:flex"
        )}
      >
        <FilterCompanies
          filter={filter}
          setFilter={setFilter}
          setCompanyList={() => {}} // no longer manually setting list
          companyList={companyList}
          filterActive={filterActive}
          setFilterActive={setFilterActive}
        />

        <Results
          filter={filter}
          setCompanyId={setCompanyId}
          companyPost={companyList}
          searchParams={searchParams}
          filterActive={filterActive}
        />
      </div>

      {/* Company details */}
      {companyId && (
        <AvailableCompanyDetails
          details={companyDetail}
          setCompanyId={setCompanyId}
          setShowModal={setShowModal}
        />
      )}

      {/* Application modal */}
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ApplicationForm id={companyId} />
      </Modal>
    </Wrapper>
  );
}
