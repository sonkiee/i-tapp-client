"use client";
import React from "react";
import archive from "@/assets/icons/archive-add.svg";
import share from "@/assets/icons/share.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight2 } from "iconsax-react";
import { useAction } from "next-safe-action/hooks";
import { apply, save } from "@/api/actions/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dp from "@/assets/images/dp.png";
import moment from "moment";

export default function AvailableCompanyDetails({ details, setCompanyId }) {
  const {
    id, // Extracted id from details
    companyLogo,
    profileImageUrl,
    title,
    description,
    duration,
    industry,
    createdDate,
    totalApplicants,
    location,
  } = details;

  // Get the apply action hook
  const {
    execute: applyAction,
    isExecuting,
    hasErrored,
  } = useAction(apply, {
    onSuccess(data) {
      const { message } = data.data;
      toast.success(message);
    },
    onError(error) {
      console.error("Application failed", error);
      toast.error("Failed to apply. Please try again.");
    },
  });

  const handleApply = () => {
    const applicationData = {
      jobId: id,
    };
    applyAction(applicationData);
  };

  const { execute: saveAction } = useAction(save, {
    onSuccess(data) {
      const { message } = data.data;
      toast.success(message);
    },
    onError(error) {
      console.error("Failed to save job", error);
      toast.error("Failed to save job. Please try again.");
    },
  });

  const handleSave = () => {};
  const date = moment(createdDate).format("ll");

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "title",
        text: "text",
        url: "url",
      });
    } catch (error) {
      console.error("Error sharing content:", error);
    }
  };

  return (
    <div className="w-full rounded-xl md:flex p-8 bg-white flex-col md:relative md:basis-[20rem] md:rounded-l-xl h-full mx-auto">
      {/* Your content */}
      <div className="flex justify-between border-b">
        <div className="flex flex-col gap-4 pb-6 w-full">
          <div className="flex justify-between gap-2">
            <Image
              src={profileImageUrl || dp}
              alt="companylogo"
              width={75}
              height={75}
              className="bg-grey-5"
            />
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
              <ArrowRight2 onClick={() => setCompanyId(null)} />
            </div>
          </div>

          <div>
            <h6 className="text-h6">{title}</h6>
            <p className="text-primary mt-2">{location}</p>
          </div>
          <p className="text-sm text-[#5374E7] bg-opacity-10 bg-[#5374E7] px-3.5 py-2 rounded-[50px] inline-block w-36">
            {totalApplicants} Applicants
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-10 gap-y-6 py-8">
        <div>
          <h6 className="text-h6">Duration</h6>
          <p className="text-[#6E6E9B]">{duration} Months</p>
        </div>
        <div>
          <h6 className="text-h6">Industry</h6>
          <p className="text-[#6E6E9B] capitalize">{industry}</p>
        </div>
        <div>
          <h6 className="text-h6">Date Posted</h6>
          <p className="text-[#6E6E9B]">{date}</p>
        </div>
      </div>

      <div className=" mb-6 border-t border-b py-4">
        <h6 className="text-h6">Description</h6>
        <p className="text-[#6E6E9B] py-6 ">{description}</p>
      </div>

      <Button
        size="sm"
        className="w-full"
        onClick={handleApply}
        disabled={isExecuting}
      >
        {isExecuting ? "Applying..." : "Apply Now"}
      </Button>
      {hasErrored && (
        <p className="text-red-500">Application failed. Please try again.</p>
      )}
      <ToastContainer />
    </div>
  );
}
