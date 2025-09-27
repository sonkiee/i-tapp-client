"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ProfileForm from "./profile-form";
import { useStudentStore } from "@/lib/store/student";
import { logout } from "@/actions/auth";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const student = useStudentStore((s) => s.student);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  if (!student) {
    return <p className="text-center text-gray-500 mt-24">No student data</p>;
  }

  if (editing) {
    return (
      <div className="max-w-5xl mx-auto mt-24 p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Edit Profile</h1>
          <div className="flex space-x-2">
            <Button variant="secondary" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
        <ProfileForm />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-24 p-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Student Profile</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setEditing(true)}>Edit Profile</Button>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          <Field label="First Name" value={student.firstName} />
          <Field label="Last Name" value={student.lastName} />
          <Field label="Email" value={student.email} />
          <Field label="Phone" value={student.phoneNumber} />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Field label="Soft Skills" value={student.softSkills} />
          <Field label="Technical Skills" value={student.technicalSkills} />
          <Field label="Preferred Industry" value={student.preferredIndustry} />
          <Field label="Goals" value={student.goals} />
        </div>
      </div>

      <div className="mt-6">
        <Field label="Bio" value={student.bio} multiline />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  multiline,
}: {
  label: string;
  value?: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p
        className={`text-base text-gray-900 border border-gray-300 rounded-md px-3 py-2 bg-white ${
          multiline ? "min-h-[100px] whitespace-pre-line" : ""
        }`}
      >
        {value || "—"}
      </p>
    </div>
  );
}
