"use client";

import React, { useState } from "react";

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState("freelancer"); // default selected role

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">
        Join as a client or freelancer
      </h1>
      <div className="flex gap-4 mb-6">
        <div
          className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center 
            ${
              selectedRole === "client" ? "border-green-600" : "border-gray-300"
            }
          `}
          onClick={() => handleRoleChange("client")}
        >
          <div className="text-4xl mb-2">👤</div>
          <p className="text-lg font-semibold text-center">
            I'm a client, hiring for a project
          </p>
        </div>

        <div
          className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center 
            ${
              selectedRole === "freelancer"
                ? "border-green-600"
                : "border-gray-300"
            }
          `}
          onClick={() => handleRoleChange("freelancer")}
        >
          <div className="text-4xl mb-2">👨‍💻</div>
          <p className="text-lg font-semibold text-center">
            I'm a freelancer, looking for work
          </p>
        </div>
      </div>

      <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
        Apply as a{" "}
        {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
      </button>

      <p className="mt-4 text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-green-600 hover:underline">
          Log In
        </a>
      </p>
    </div>
  );
};

export default Signup;
