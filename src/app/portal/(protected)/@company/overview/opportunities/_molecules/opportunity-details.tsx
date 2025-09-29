"use client";

import { useState } from "react";
import OpportunityTable from "./oppportunity-table";
import OpportunityForm from "./edit-opportunity";
import { Button } from "@/components/ui/button";

export default function OpportunityDetailsPage() {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return <OpportunityForm />;
  }
  return (
    <div className="p-6 w-full">
      {/* Header Info */}
      <div className="text-sm text-gray-600 mb-4">
        Full-Time • San Francisco, CA
      </div>

      {/* Card Container */}
      <div className=" rounded-md shadow-sm p-6 w-full">
        {/* Opportunity Section */}
        <div className="flex flex-flow justify-between">
          <h1 className="text-2xl font-semibold mb-4">Opportunity Details</h1>
          <div className="flex flex-row justify-center gap-2">
            <Button variant={"default"} onClick={() => setEditing(true)}>
              Edit
            </Button>
            <Button variant={"secondary"}>Close</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 text-sm text-gray-700 mb-4">
          <div>
            <span className="font-medium">Department:</span>{" "}
            <span>Engineering</span>
          </div>
          <div>
            <span className="font-medium">Status:</span>{" "}
            <span className="text-green-600">Active</span>
          </div>
          <div>
            <span className="font-medium">Posted On:</span>{" "}
            <span>2024-07-20</span>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          Seeking a talented Frontend intern to join our growing team. You’ll
          help build UI components and work closely with senior engineers.
        </p>

        <hr className="-mx-6 border-gray-200 mb-6" />

        {/* Applicants Section */}
        <h2 className="text-xl font-semibold mb-4">Applicants</h2>
        {/* <div className="space-y-3">Map over applicants here later</div> */}

        {/* Tbale  */}

        <OpportunityTable />
      </div>
    </div>
  );
}
