import { query } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await query("/student/jobs");
      return response;
    },
  });
};

export const useFetchApplication = () => {
  return useQuery({
    queryKey: ["application"],
    queryFn: async () => {
      const response = await query("/student/applications");
      return response;
    },
  });
};

export const useFetchSavedApplication = () => {
  return useQuery({
    queryKey: ["saved-applocation"],
    queryFn: async () => {
      const response = await query("/student/saved/applications");
      return response;
    },
  });
};

export const useFetchAcceptedApplications = () => {
  return useQuery({
    queryKey: ["acceted-application"],
    queryFn: async () => {
      const response = await query("/student/job/current");
      return response;
    },
  });
};

export const useFetchAllCompanyApplications = () => {
  return useQuery({
    queryKey: ["company-application"],
    queryFn: async () => {
      const response = await query("/company/all/category");
      return response;
    },
  });
};

export const useFetchCompanyJobs = () => {
  return useQuery({
    queryKey: ["company-jobs"],
    queryFn: async () => {
      const response = await query("/company/jobs/all");
      return response;
    },
  });
};
