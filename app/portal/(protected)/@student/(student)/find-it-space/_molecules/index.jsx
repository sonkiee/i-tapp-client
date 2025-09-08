"use client";
import React, { useEffect, useState } from "react";
import FilterCompanies from "./filter";
import { Wrapper } from "@/components/wrapper";
import Results from "./results";
import { filters } from "@/config/student";
import { Filter } from "iconsax-react";
import AvailableCompanyDetails from "./available-company-details";
import { cn } from "@/lib/utils/tailwind";
import Modal from "@/components/ui/modal";
import ApplicationForm from "./form";
import { fetchJobs } from "@/api/actions/auth";
import { useGlobal } from "@/context/GlobalContext";

export default function FindITSpace({ searchParams }) {
  const [companyId, setCompanyId] = useState(null);
  const [filter, setFilter] = useState(filters);
  const [filterActive, setFilterActive] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const companyDetail = companyList.find((company) => company.id === companyId);
  const [showModal, setShowModal] = useState(false);

  const { setStudent, student } = useGlobal();
  console.log(companyList);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetchJobs(); // Await the promise resolution
        const companyData = response?.data?.flat() || []; // Flatten the array if it's nested
        setCompanyList(companyData); // Set the flattened data
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    getJobs(); // Call the async function
  }, []); // Empty dependency array to run once after component mounts

  useEffect(() => {
    try {
      const storedStudent = localStorage.getItem("user");
      if (storedStudent) {
        setStudent(JSON.parse(storedStudent));
      }
    } catch (error) {
      console.error("Error parsing student data from localStorage:", error);
    }
  }, [setStudent]);

  return (
    <Wrapper
      className={cn(
        " touch:px-5 bg-[#F0F0F5] max-w-full flex flex-col justify-center  md:flex-row md:justify-between mt-4 sm:py-20 sm:pb-10 md:px-10  gap-x-4",
        companyId && "touch:pr-0 md:pr-0"
      )}
    >
      {companyId === null && (
        <div className="sm:hidden text-center mb-4">
          <div
            className=" bg-white inline-block p-1 rounded border border-black"
            onClick={() => setFilterActive(true)}
          >
            <Filter className="inline mr-2" />
            <span>filter</span>
          </div>
        </div>
      )}
      <div
        className={cn(
          "flex justify-center gap-x-8  md:w-9/12",
          companyId && "hidden md:flex "
        )}
      >
        <FilterCompanies
          filter={filter}
          setFilter={setFilter}
          setCompanyList={setCompanyList}
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
      {companyId && (
        <AvailableCompanyDetails
          details={companyDetail}
          setCompanyId={setCompanyId}
          setShowModal={setShowModal}
        />
      )}
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ApplicationForm id={companyId} />
      </Modal>
    </Wrapper>
  );
}
