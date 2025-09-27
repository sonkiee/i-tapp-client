"use client";

import { Next13ProgressBar } from "next13-progressbar";
import { Suspense } from "react";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Suspense>
        <Next13ProgressBar
          height="4px"
          color="#477DC0"
          options={{ showSpinner: false }}
          showOnShallow
        />
      </Suspense>
    </>
  );
}
