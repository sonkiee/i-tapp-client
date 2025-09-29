"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, Call, Location, Note1, Sms } from "iconsax-reactjs";
import { useGlobal } from "@/context/GlobalContext";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { toast } from "react-toastify";
import Link from "next/link";
import moment from "moment";
import { acceptApplication, declineApplication } from "@/actions/company";
import { GraduationCap } from "lucide-react";

export default function CandidateProfile() {
  const { selectedApplicant } = useGlobal();
  const student = selectedApplicant?.student;
  const name = student?.firstName + " " + student?.lastName;

  const { execute: acceptAction, isExecuting: isAccepting } = useAction(
    acceptApplication,
    {
      onSuccess: () => {
        toast.success("Application accepted successfully!");
      },
      onError: (error) => {
        const { serverError } = error?.error;
        const errorMessage = serverError || "An error occurred.";
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
    <div className="min-h-screen bg-background py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex gap-6 items-center mb-8">
          <Link href={`/portal/candidates/accepted`}>
            <ArrowLeft
              className="text-foreground cursor-pointer hover:text-primary transition-colors"
              size={24}
            />
          </Link>
          <div className="rounded-full border-2 border-primary/20 h-[100px] w-[100px] overflow-hidden">
            <Image
              src={student?.profileImageUrl || "/applicant.png"}
              alt={name}
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="font-semibold text-2xl text-foreground">{name}</h1>
            <p className="text-base pt-1 text-muted-foreground">
              {student?.courseOfStudy || "Not specified"}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bio & Contact Info Card */}
          <div className="border-2 border-primary/20 rounded-lg bg-card p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Bio & Contact
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">ABOUT</p>
                <p className="text-sm text-foreground leading-relaxed">
                  {student?.bio || "No bio provided."}
                </p>
              </div>

              <hr className="border-primary/20" />

              <div>
                <div className="flex items-start gap-3 mb-3">
                  <Sms className="text-primary mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      EMAIL ADDRESS
                    </p>
                    <a
                      href={`mailto:${student?.email}`}
                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {student?.email || "Not specified"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-3">
                  <Call className="text-primary mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      PHONE NUMBER
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {student?.phoneNumber || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Location className="text-primary mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      ADDRESS
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {student?.address || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Application Status & Student Info Card */}
          <div className="border-2 border-primary/20 rounded-lg bg-card">
            {/* Application Status Section */}
            <div className="p-6 border-b border-primary/20">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Application Status
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Status:</p>
                  <span className="text-sm font-semibold text-foreground">
                    {selectedApplicant?.accepted
                      ? "Accepted"
                      : "Pending Review"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Applied Date:</p>
                  <span className="text-sm font-semibold text-foreground">
                    {selectedApplicant?.createdAt
                      ? moment(selectedApplicant.createdAt).format("ll")
                      : "N/A"}
                  </span>
                </div>
              </div>

              {selectedApplicant?.accepted ? (
                <div className="space-y-3">
                  <div className="bg-primary/5 rounded-md p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        Start Date:
                      </p>
                      <span className="text-sm font-bold text-foreground">
                        {selectedApplicant?.startDate
                          ? moment(selectedApplicant.startDate).format("ll")
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">End Date:</p>
                      <span className="text-sm font-bold text-foreground">
                        {selectedApplicant?.endDate
                          ? moment(selectedApplicant.endDate).format("ll")
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    disabled
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Accepted
                  </Button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Button
                    onClick={handleAccept}
                    size="default"
                    disabled={isAccepting}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isAccepting ? "Processing..." : "Accept"}
                  </Button>
                  <Button
                    onClick={() => declineAction({ studentId: student.id })}
                    disabled={isDeclining}
                    size="default"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isDeclining ? "Processing..." : "Decline"}
                  </Button>
                </div>
              )}
            </div>

            {/* Student Information Section */}
            <div className="p-6 border-b border-primary/20">
              <h2 className="text-lg font-bold text-foreground mb-4">
                Student Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <GraduationCap className="text-primary mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">SCHOOL</p>
                    <p className="text-sm font-semibold text-foreground">
                      {student?.school || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Note1 className="text-primary mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      COURSE OF STUDY
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {student?.courseOfStudy || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Documents Section */}
            <div className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">
                Application Documents
              </h2>

              {student?.documentUrls && student.documentUrls.length > 0 ? (
                <Button
                  size="lg"
                  onClick={() =>
                    window.open(
                      student.documentUrls,
                      "_blank",
                      "noopener noreferrer"
                    )
                  }
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View Documents
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No documents uploaded.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
