import React from "react";
import Link from "next/link";

export function OverviewBox({
  title,
  number,
  icon = <></>,
  link,
}: {
  title: string;
  number: string | number;
  icon: React.ReactNode;
  link: string;
}) {
  return (
    <Link href={link}>
      <div className="w-full bg-primary flex rounded-md text-white gap-4 p-3 content-center justify-between">
        <div>
          <h6 className="font-semi-bold text-md mb-4">{number}</h6>
          <p>{title} applicant</p>
        </div>
        {icon && (
          <div className="bg-white text-black rounded size-10 flex justify-center items-center self-center">
            {icon}
          </div>
        )}
      </div>
    </Link>
  );
}
