import { CompanyLayoutUi } from "@/components/layouts/protected/company";
import StudentLayout from "@/components/layouts/protected/student";
import { headers } from "next/headers";

type UserRole = "company" | "student";

interface PortalLayoutProps {
  company: React.ReactNode;
  student: React.ReactNode;
  userRole: UserRole;
}

export default async function PortalLayout({
  company,
  student,
}: PortalLayoutProps) {
  const headerList = await headers();

  const userRole = headerList.get("x-user-role")?.toLowerCase() as UserRole;

  return (
    <StudentLayout>{student}</StudentLayout>
    // <>
    //   {userRole === "student" ? (
    //     <StudentLayout>{student}</StudentLayout>
    //   ) : (
    //     <CompanyLayoutUi>{company}</CompanyLayoutUi>
    //   )}
    // </>
  );
}
