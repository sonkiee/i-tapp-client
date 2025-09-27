"use client";

import React, { ReactNode } from "react";
import { Header } from "../header";

const StudentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default StudentLayout;
