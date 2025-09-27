"use client";

import { Logo } from "@/components/logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface RoleOptionProps {
  role: string;
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onSelect: (role: string) => void;
}

const RoleOption: React.FC<RoleOptionProps> = ({
  role,
  icon,
  label,
  isSelected,
  onSelect,
}) => (
  <div
    className={`p-6 border rounded-lg cursor-pointer transition-all flex flex-col items-center text-center
      ${
        isSelected
          ? "border-[#477DC0] bg-[#cedcee]"
          : "border-gray-300 hover:bg-gray-50"
      }`}
    onClick={() => onSelect(role)}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <p className="text-lg font-semibold">{label}</p>
  </div>
);

const RoleSelection = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedRole === "student") {
      // Redirect to student registration page
      router.push("/student/signup");
    } else if (selectedRole === "company") {
      // Redirect to company registration page
      router.push("/company/signup");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-center mb-8">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">Join as a student or company</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <RoleOption
            role="student"
            icon="👤"
            label="Find IT Spaces"
            isSelected={selectedRole === "student"}
            onSelect={handleRoleChange}
          />
          <RoleOption
            role="company"
            icon="👨‍💻"
            label="Hire Interns"
            isSelected={selectedRole === "company"}
            onSelect={handleRoleChange}
          />
        </div>
        <button
          type="submit"
          disabled={selectedRole === "" || !selectedRole.length}
          className="w-full bg-[#477DC0] text-white py-2 px-6 rounded-lg hover:bg-[#4f4f4f] transition-colors"
        >
          Apply as a{" "}
          {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
        </button>
      </form>
      <p className="mt-6 text-gray-600">
        Already have an account?{" "}
        <a href="/signin" className="text-[#477DC0] hover:underline">
          Log In
        </a>
      </p>
    </div>
  );
};

export default RoleSelection;
