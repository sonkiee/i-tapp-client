import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompanyState {
  company: any;
  companyJobs: any[];
  selectedJob: any;
  totalApplicants: number;
  acceptedApplicants: number;
  shortlistedApplicants: number;
  selectedApplicant: any;
  setCompany: (c: any) => void;
  setCompanyJobs: (jobs: any[]) => void;
  setTotalApplicants: (count: number) => void;
  setAcceptedApplicants: (count: number) => void;
  setSelectedJob: (job: any) => void;
  setShortlistedApplicants: (count: number) => void;
  setSelectedApplicant: (a: any) => void;
  updateCompanyProfile: (updates: Partial<any>) => void;
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set) => ({
      company: null,
      companyJobs: [],
      selectedJob: null,
      totalApplicants: 0,
      acceptedApplicants: 0,
      shortlistedApplicants: 0,
      selectedApplicant: null,

      setCompany: (c) => set({ company: c }),
      setSelectedJob: (job) => set({ selectedJob: job }),
      setCompanyJobs: (jobs) => set({ companyJobs: jobs }),
      setTotalApplicants: (count) => set({ totalApplicants: count }),
      setAcceptedApplicants: (count) => set({ acceptedApplicants: count }),
      setShortlistedApplicants: (count) =>
        set({ shortlistedApplicants: count }),
      setSelectedApplicant: (a) => set({ selectedApplicant: a }),

      updateCompanyProfile: (updates) =>
        set((state) => ({
          company: { ...state.company, ...updates },
        })),
    }),
    { name: "company-store" }
  )
);
