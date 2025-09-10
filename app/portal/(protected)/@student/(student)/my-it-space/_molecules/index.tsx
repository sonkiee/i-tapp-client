"use client";

import React, { useState } from "react";
import { Wrapper } from "@/components/wrapper";
import EmptySpace from "./empty-space";
import AboutSpace from "./about-space";
import { cn } from "@/lib/utils";
import { useFetchAcceptedApplications } from "@/hooks/query";

export interface Company {
  id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  founded: string;
  industry: string;
  duration: string;
  capacity: string;
  website: string;
}

const MyItSpace = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // ✅ Fetch applications using TanStack Query
  const {
    data: applications = [],
    isLoading,
    error,
  } = useFetchAcceptedApplications();

  const selectCompany = (company: Company | null) => {
    setSelectedCompany(company);
  };

  return (
    <div>
      <Wrapper
        className={cn(
          "touch:px-5 bg-white max-w-full flex flex-col justify-center md:flex-row md:justify-between mt-4 sm:py-20 sm:pb-10 md:px-10 gap-x-4"
        )}
      >
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">
            Failed to fetch applications. Please try again.
          </div>
        ) : applications.length > 0 ? (
          <div className="flex flex-col md:flex-row w-full">
            {/* Applications List */}
            <div className="w-full md:w-1/3">
              <ul className="list-decimal pl-5 space-y-2">
                {applications.map((app: Company, index: number) => (
                  <li
                    key={index}
                    className="text-[#282828] text-opacity-70 hover:text-blue-500 cursor-pointer pl-5 w-[270px] pr-8 py-3 font-bold flex gap-6 text-base items-center"
                    onClick={() => selectCompany(app)}
                  >
                    {app.name || "Unknown Company"}
                  </li>
                ))}
              </ul>
            </div>

            {/* Selected Company Details */}
            <div className="w-full md:w-2/3">
              {selectedCompany ? (
                <AboutSpace company={selectedCompany} />
              ) : (
                <div className="text-center">
                  Select a company to view details.
                </div>
              )}
            </div>
          </div>
        ) : (
          <EmptySpace />
        )}
      </Wrapper>
    </div>
  );
};

export default MyItSpace;
