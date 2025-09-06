"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import axiosInstance from "@/lib/axiosInstance";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [company, setCompany] = useState([]);

  const [students, setStudents] = useState([]);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalApplicants, setTotalApplicants] = useState([]);
  const [acceptedApplicants, setAcceptedApplicants] = useState([]);
  const [shortlistedApplicants, setShortlistedApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [savedApplications, setSavedApplications] = useState([]);
  const [student, setStudent] = useState([]);

  const updateCompanyProfile = useCallback(
    async (data) => {
      try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
          }
        });

        if (data.profileImage) {
          formData.append("profileImage", data.profileImage);
        }

        if (data.backgroundImage) {
          formData.append("backgroundImage", data.backgroundImage);
        }

        const response = await axiosInstance.post(`/company/profile`, formData);
        localStorage.setItem("company", JSON.stringify(company));

        return response.data;
      } catch (error) {
        console.log("Error updating company profile:", error);
      }
    },
    [company]
  );

  const updateStudentProfile = useCallback(async (data) => {
    try {
      // const formData = new FormData();
      // Object.entries(data).forEach(([key, value]) => {
      //   if (value instanceof File) {
      //     formData.append(key, value);
      //   } else if (value !== undefined && value !== null) {
      //     formData.append(key, value.toString());
      //   }
      // });

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      if (data.profileImage) {
        formData.append("profileImage", data.profileImage);
      }

      if (data.documents) {
        formData.append("documents", data.documents);
      }

      const response = await axiosInstance.post(`/student/profile`, formData);

      return response.data;
    } catch (error) {
      console.log("Error updating company profile:", error);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        company,
        loading,
        setTotalApplicants,
        setAcceptedApplicants,
        setShortlistedApplicants,
        setSelectedApplicant,
        selectedApplicant,
        setUser,
        setCompany,
        companyJobs,
        setCompanyJobs,
        totalApplicants,
        acceptedApplicants,
        shortlistedApplicants,
        updateCompanyProfile,
        updateStudentProfile,
        savedApplications,
        setSavedApplications,
        students,
        setStudents,
        student,
        setStudent,
        selectedJob,
        setSelectedJob,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
