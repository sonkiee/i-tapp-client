export interface Applicant {
  id: string;
  name: string;
  university: string;
  accepted: boolean;
  student: Student;
  startDate?: string;
  endDate?: string;
}

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  school: string;
  email: string;
  profileImageUrl: string;
};
