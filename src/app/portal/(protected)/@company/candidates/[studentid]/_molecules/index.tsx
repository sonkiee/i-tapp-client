"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, Call, Location, Note1, Sms } from "iconsax-reactjs";
import { useGlobal } from "@/context/GlobalContext";
import { Button } from "@/components/ui/button";
// import { acceptApplication, declineApplication } from "@/api/actions/auth";
import { useAction } from "next-safe-action/hooks";
import { toast } from "react-toastify";

import Link from "next/link";
import moment from "moment";
import { acceptApplication, declineApplication } from "@/actions/company";

export default function CandidateProfile() {
  const { selectedApplicant } = useGlobal();
  console.log(selectedApplicant);

  const student = selectedApplicant?.student;
  const id = student?.id;

  const name = student?.firstName + " " + student?.lastName;
  console.log(student);

  const { execute: acceptAction, isExecuting: isAccepting } = useAction(
    acceptApplication,
    {
      onSuccess: () => {
        toast.success("Application accepted successfully!");
      },
      onError: (error) => {
        const { serverError } = error?.error;
        const errorMessage = serverError || "An error occurred.";
        console.log(serverError);
        toast.error(errorMessage);
      },
    }
  );

  const { execute: declineAction, isExecuting: isDeclining } = useAction(
    declineApplication,
    {
      onSuccess: () => {
        toast.success("Application declined successfully!");
      },
      onError: (error) => {
        const { serverError } = error?.error;
        const errorMessage = serverError || "An error occurred.";
        console.log(serverError);
        toast.error(errorMessage);
      },
    }
  );

  const handleAccept = () => {
    if (student?.id) {
      acceptAction({ studentId: student.id });
    }
  };

  return (
    <div className="p-6 bg-background">
      <div className="flex gap-6 justify-between flex-wrap mb-8">
        <div className="flex gap-6 items-center">
          <Link href={`/portal/candidates/accepted`}>
            <ArrowLeft className="text-foreground cursor-pointer" size={24} />
          </Link>
          <div className="rounded-full border h-[100px] w-[100px]">
            <Image
              src={student?.profileImageUrl || "/applicant.png"}
              alt="applicant"
              width={100}
              height={100}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <div>
            <p className="font-semibold text-lg text-foreground">{name}</p>
            <p className="text-base pt-1.5 pr-2.5 text-muted-foreground">
              {student?.courseOfStudy || "Not specified "}
            </p>
          </div>
        </div>

        {selectedApplicant.accepted ? (
          <>
            {" "}
            <div className="flex gap-3 justify-center items-center">
              <div className="flex flex-col gap-2 items-center">
                <p>
                  Start Date:{" "}
                  <span className="font-bold">
                    {selectedApplicant?.startDate
                      ? moment(selectedApplicant.startDate).format("ll")
                      : "N/A"}
                  </span>
                </p>
                <p>
                  End Date:{" "}
                  <span className="font-bold">
                    {selectedApplicant?.endDate
                      ? moment(selectedApplicant.endDate).format("ll")
                      : "N/A"}
                  </span>
                </p>
              </div>

              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
              >
                Accepted
              </Button>
            </div>
          </>
        ) : (
          <div className="flex gap-3 self-center">
            <Button
              onClick={handleAccept}
              size="sm"
              disabled={isAccepting}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
            >
              Accept
            </Button>
            <Button
              onClick={() => declineAction({ studentId: student.id })}
              disabled={isDeclining}
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3"
            >
              Decline
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="font-bold mb-2 text-foreground">Bio</p>

        <div className="flex justify-between gap-4 flex-wrap">
          <p className="text-sm max-w-[590px] text-foreground">
            {student?.bio || "No bio provided."}
          </p>

          <div className="border-2 border-primary/20 max-w-[380px] rounded-md bg-card">
            <div className="flex flex-col gap-3 text-sm p-6">
              <h6 className="text-md font-semibold text-foreground">
                Student information
              </h6>

              <div className="flex flex-col gap-1">
                <Note1 className="text-primary" size={20} />
                <p className="text-muted-foreground text-sm">NAME OF SCHOOL</p>
                <p className="font-bold text-foreground">
                  {student?.school || "Not specified"}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <Sms className="text-primary" size={20} />
                <p className="text-muted-foreground text-sm">EMAIL ADDRESS</p>
                <p className="font-bold text-foreground">
                  <a
                    href={`mailto:${student?.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {student?.email || "Not specified"}
                  </a>
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <Call className="text-primary" size={20} />
                <p className="text-muted-foreground text-sm">PHONE NUMBER</p>
                <p className="font-bold text-sm text-foreground">
                  {student?.phoneNumber || "Not specified"}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <Location className="text-primary" size={20} />
                <p className="text-muted-foreground text-sm">ADDRESS</p>
                <p className="font-bold text-foreground">
                  {student?.address ||
                    "No 3, Ugbolokposo road, off Ugbomoro street, Apapa, Lagos state."}
                </p>
              </div>
            </div>

            <div className="border-t border-primary/20 p-6">
              <h6 className="font-bold text-foreground mb-3">
                Application Documents
              </h6>
              <div className="flex gap-3 items-center">
                {student?.documentUrls && student.documentUrls.length > 0 ? (
                  <Button
                    size="sm"
                    onClick={() =>
                      window.open(
                        student.documentUrls,
                        "_blank",
                        "noopener noreferrer"
                      )
                    }
                    className="px-4 py-2 bg-secondary text-secondary-foreground"
                  >
                    View
                  </Button>
                ) : (
                  <p className="text-gray-600">No documents uploaded.</p>
                )}

                {/* <Button
                  size="sm"
                  className="px-4 py-2 bg-secondary text-secondary-foreground"
                >
                  <span>Save</span> <ArchiveAdd className="ml-2" size={20} />
                </Button>

                <Button
                  size="sm"
                  className="px-4 py-2 bg-primary text-primary-foreground"
                >
                  Shortlist
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
