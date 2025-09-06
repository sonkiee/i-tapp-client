"use client";

import { Wrapper } from "@/components/wrapper";
import { CompanyHeader } from "../company-header";
import { Nav } from "../nav";
import { useGlobal } from "@/context/GlobalContext";
import { useEffect } from "react";
import { fetchAllCompanyApplications } from "@/api/actions/auth";
import { fetchCompanyJobs } from "@/api/actions/auth";

export function CompanyLayoutUi({ children }: { children: React.ReactNode }) {
  const {
    setTotalApplicants,
    setAcceptedApplicants,
    setShortlistedApplicants,
    setCompanyJobs,
  } = useGlobal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllCompanyApplications();
        const total = response?.data.totalApplicants;
        setTotalApplicants(total);
        const accepted = response?.data.acceptedApplicants;
        setAcceptedApplicants(response?.data.acceptedApplicants);
        const shortlisted = response?.data.shortListedApplicants;
        setShortlistedApplicants(shortlisted);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };

    fetchData();
  }, [setTotalApplicants, setAcceptedApplicants, setShortlistedApplicants]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCompanyJobs();
        setCompanyJobs(response?.data);
      } catch (error) {
        console.error("Failed to fetch company jobs:", error);
      }
    };

    fetchData();
  }, [setCompanyJobs]);

  // const company = JSON.parse(localStorage.getItem("company") || "{}");
  return (
    <>
      <CompanyHeader />
      <Wrapper className="flex items-start gap-8">
        <Nav />
        <div className="w-full">{children}</div>
      </Wrapper>
    </>
  );
}
