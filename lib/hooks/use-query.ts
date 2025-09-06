"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

export const useFetchCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/companies");
      console.log("ftehc ", response.data);
      return response.data;
    },
  });
};
