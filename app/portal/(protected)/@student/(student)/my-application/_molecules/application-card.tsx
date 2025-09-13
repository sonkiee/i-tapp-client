import React from "react";

export default function ApplicationCard({ application }) {
  return (
    <div className=" sm:hidden border border-black rounded-xl p-5">
      <h6 className="text-h6 mb-1">{application.companyName}</h6>
      <p className="text-primary">{application.location}</p>
      <div className="my-4 *:bg-[#F0F0F5] *:rounded-[50px] *:px-3.5 *:py-2 *:text-xs  *:xxs:text-sm">
        <span className="mr-2">{application.industry}</span>
        <span>Active</span>
      </div>
      <div className="*:text-primary *:text-xs  *:xxs:text-sm">
        <span className="mr-3">300 Applicants</span>
        <span>Applied on 22 Feb' 24</span>
      </div>
    </div>
  );
}
