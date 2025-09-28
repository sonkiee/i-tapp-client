import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/tailwind";
import ApplicationCard from "./application-card";
import moment from "moment";

export default function ApplicationTable({ query, applications }) {
  const myApplication = applications.filter((app) =>
    app.companyName?.toLocaleLowerCase().startsWith(query.toLocaleLowerCase())
  );

  return (
    <div>
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Applied on</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>No of Applicants</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application, key) => (
              <TableRow key={key}>
                <TableCell>{application?.opportunity?.company?.name}</TableCell>
                <TableCell>
                  {moment(application.appliedAt).format("MMM Do YY")}
                </TableCell>
                <TableCell>{application.location}</TableCell>
                <TableCell>{application.industry}</TableCell>
                <TableCell>{application.numberOfApplicants}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      " text-base border text-center bg-opacity-35 py-1.5 px-6 rounded-md",
                      true
                        ? " border-[#008767] text-[#008767]  bg-[#00B087] "
                        : "border-[#DF0404] text-[#DF0404]  bg-[#DF0404]"
                    )}
                  >
                    Active
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className=" flex flex-col gap-4">
        {myApplication.map((application, key) => (
          <ApplicationCard key={key} application={application} />
        ))}
      </div>
    </div>
  );
}
