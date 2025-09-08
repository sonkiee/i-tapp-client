import StudentLayout from "@/components/layouts/protected/student";
import React from "react";

export default function Layout({ children }) {
  return <StudentLayout>{children}</StudentLayout>;
}
