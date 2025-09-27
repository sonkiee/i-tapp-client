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
  description: string | null;
  location: string;
  startDate: string;
  endDate: string;
  founded: string;
  industry: string;
  duration: number;
  capacity: string | null;
  website: string | null;
}

const MyItSpace = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const {
    data: applicationsResponse,
    isLoading,
    error,
  } = useFetchAcceptedApplications();

  const applications: Company[] = applicationsResponse?.data || [];

  const selectCompany = (company: Company | null) => {
    setSelectedCompany(company);
  };

  return (
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
        <div className="flex flex-col md:flex-row w-full gap-6">
          {/* Applications List */}
          <div className="w-full md:w-1/3">
            <ul className="list-decimal pl-5 space-y-2">
              {applications.map((app, index) => (
                <li
                  key={app.id || index}
                  className="text-[#282828] text-opacity-70 hover:text-blue-500 cursor-pointer pl-5 pr-8 py-3 font-bold flex gap-6 text-base items-center"
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
              <div className="text-center text-gray-500">
                Select a company to view details.
              </div>
            )}
          </div>
        </div>
      ) : (
        <EmptySpace />
      )}
    </Wrapper>
  );
};

export default MyItSpace;
