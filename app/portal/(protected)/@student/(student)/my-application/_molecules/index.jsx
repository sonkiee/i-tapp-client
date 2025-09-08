"use client";

import { React, useState, useEffect } from "react";
import ApplicationTable from "./application-table";
import { Wrapper } from "@/components/wrapper";
import ApplicationSearch from "./application-search";
import { SitePagination } from "@/components/ui/site-pagination";
import { fetchApplication } from "@/api/actions/auth";
import usePaginator from "@/lib/hooks/use-paginator";

export default function MyApplication({ searchParams }) {
  const [application, setApplication] = useState([]);

  // const [company, setCompany] = useState([]);
  // const [loading, setLoading] = useState(true); // For loading state
  useEffect(() => {
    const getApplications = async () => {
      try {
        const response = await fetchApplication(); // Replace with your actual fetch function
        const fetchedData = response?.data;

        const fetchedStudents = fetchedData.student || [];
        setApplication(fetchedStudents);

        // setCompanies(uniqueCompanies);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    getApplications(); // Call the async function
  }, []);

  const query = searchParams?.query || "";
  const { applications, setCurrentPage, postPerPage, currentPage, paginate } =
    usePaginator(6, application);

  console.log(application);

  return (
    <div>
      <Wrapper className=" sm:pb-10">
        <ApplicationSearch />
        {applications.length !== 0 ? (
          <>
            <ApplicationTable query={query} applications={application} />
            <SitePagination
              totalPosts={application.length}
              postsPerPage={postPerPage}
              paginate={paginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <p>No Application</p>
        )}
      </Wrapper>
    </div>
  );
}
