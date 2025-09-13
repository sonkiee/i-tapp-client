"use client";

import React from "react";
import ApplicationTable from "./application-table";
import { Wrapper } from "@/components/wrapper";
import ApplicationSearch from "./application-search";
import { SitePagination } from "@/components/ui/site-pagination";
import usePaginator from "@/hooks/use-paginator";
import { useFetchSavedApplication } from "@/hooks/query";

export default function SavedApplication({ searchParams }) {
  const query = searchParams?.query || "";

  // Fetch saved applications from server
  const {
    data: savedApplications = [],
    isLoading,
    isError,
    error,
  } = useFetchSavedApplication();

  const { setCurrentPage, postPerPage, currentPage, paginate } = usePaginator(
    6,
    savedApplications
  );

  return (
    <div>
      <Wrapper className="sm:pb-10">
        <ApplicationSearch />

        {isLoading ? (
          <p>Loading saved applications...</p>
        ) : isError ? (
          <p className="text-red-500">
            Failed to load: {error?.message || "Something went wrong"}
          </p>
        ) : savedApplications.length > 0 ? (
          <>
            <ApplicationTable query={query} applications={savedApplications} />
            <SitePagination
              totalPosts={savedApplications.length}
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
