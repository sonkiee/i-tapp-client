import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StudentState {
  student: any;
  savedApplications: any[];
  selectedJob: any;
  students: any[];
  setStudent: (s: any) => void;
  setSavedApplications: (apps: any[]) => void;
  setSelectedJob: (job: any) => void;
  setStudents: (list: any[]) => void;
  updateStudentProfile: (updates: Partial<any>) => void;
}

export const useStudentStore = create<StudentState>()(
  persist(
    (set) => ({
      student: null,
      savedApplications: [],
      selectedJob: null,
      students: [],

      setStudent: (s) => set({ student: s }),
      setSavedApplications: (apps) => set({ savedApplications: apps }),
      setSelectedJob: (job) => set({ selectedJob: job }),
      setStudents: (list) => set({ students: list }),

      updateStudentProfile: (updates) =>
        set((state) => ({
          student: { ...state.student, ...updates },
        })),
    }),
    { name: "student-store" }
  )
);
