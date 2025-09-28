"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight2 } from "iconsax-reactjs";
import { useAction } from "next-safe-action/hooks";
import { save, apply } from "@/actions/student";
import { toast } from "react-toastify";
import dp from "@/assets/images/dp.png";
import moment from "moment";
import archive from "@/assets/icons/archive-add.svg";
import share from "@/assets/icons/share.svg";

interface CompanyDetails {
  id: string;
  companyLogo?: string;
  profileImageUrl?: string;
  title: string;
  description?: string;
  duration?: number;
  industry?: string;
  createdDate: string;
  totalApplicants?: number;
  location?: string;
}

interface AvailableCompanyDetailsProps {
  details: CompanyDetails;
  setCompanyId: (id: string | null) => void;
}

export default function AvailableCompanyDetails({
  details,
  setCompanyId,
}: AvailableCompanyDetailsProps) {
  const {
    id,
    companyLogo,
    profileImageUrl,
    title,
    description,
    duration,
    industry,
    createdDate,
    totalApplicants,
    location,
    hasApplied,
  } = details;

  const {
    execute: applyAction,
    isExecuting,
    hasErrored,
    result,
  } = useAction(apply, {
    onSuccess(data) {
      toast.success(data.data.message);
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to apply. Please try again.");
    },
  });

  const { execute: saveAction, result: saveResult } = useAction(save, {
    onSuccess(data) {
      toast.success(data.data.message);
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to save job. Please try again.");
    },
  });

  const handleApply = () => applyAction({ jobId: id });
  const handleSave = () => saveAction({ jobId: id });

  const handleShare = async () => {
    const shareData = {
      title,
      text: description || "",
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(shareData.url);
        toast.info("URL copied to clipboard");
      }
    } catch {
      toast.error("Failed to share content");
    }
  };

  const date = moment(createdDate).format("ll");

  return (
    <div className="w-full rounded-xl md:flex p-8 bg-white flex-col md:relative md:basis-[20rem] md:rounded-l-xl h-full mx-auto">
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <div className="flex justify-between border-b pb-6 gap-4">
        <Image
          src={profileImageUrl || companyLogo || dp}
          alt={title || "Company Logo"}
          width={75}
          height={75}
          className="bg-gray-100 rounded-full"
        />
        {/* <div className="flex flex-nowrap items-start gap-2 ml-auto"> */}

        <div className="flex flex-nowrap items-start gap-1 cursor-pointer">
          <Image
            src={share}
            alt="share"
            onClick={handleShare}
            className="inline-block cursor-pointer"
          />
          <Image
            src={archive}
            onClick={handleSave}
            alt="archive"
            className="inline-block cursor-pointer"
          />
          <ArrowRight2
            onClick={() => setCompanyId(null)}
            className="cursor-pointer"
            aria-label="Close"
          />
        </div>
      </div>

      <div className="mt-4">
        <h6 className="text-h6">{title}</h6>
        <p className="text-primary mt-1">{location}</p>
        <p className="text-sm text-[#5374E7] bg-opacity-10 bg-[#5374E7] px-4 py-2 rounded-full inline-block mt-2">
          {totalApplicants ?? 0} Applicants
        </p>
      </div>

      <div className="flex flex-wrap gap-x-10 gap-y-6 py-6">
        <div>
          <h6 className="text-h6">Duration</h6>
          <p className="text-[#6E6E9B]">
            {duration ? `${duration} Months` : "N/A"}
          </p>
        </div>
        <div>
          <h6 className="text-h6">Industry</h6>
          <p className="text-[#6E6E9B] capitalize">{industry ?? "N/A"}</p>
        </div>
        <div>
          <h6 className="text-h6">Date Posted</h6>
          <p className="text-[#6E6E9B]">{date}</p>
        </div>
      </div>

      <div className="mb-6 border-t border-b py-4">
        <h6 className="text-h6">Description</h6>
        <p className="text-[#6E6E9B] py-4 break-words">
          {description ?? "No description provided."}
        </p>
      </div>

      <Button
        size="sm"
        className="w-full"
        onClick={handleApply}
        disabled={hasApplied || isExecuting}
      >
        {hasApplied ? "Applied" : isExecuting ? "Applying..." : "Apply Now"}
      </Button>
      {hasErrored && <p className="text-red-500 mt-2">{result?.serverError}</p>}
    </div>
  );
}
