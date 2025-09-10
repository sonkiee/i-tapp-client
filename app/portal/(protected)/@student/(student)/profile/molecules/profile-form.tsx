"use client";

import React, { useEffect, useState } from "react";
// Other imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGlobal } from "@/context/GlobalContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { logout } from "@/api/actions/auth";
import Image from "next/image";

// const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Form schema
const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  bio: z.string().optional().optional(),
  profileImage: z.instanceof(File).optional(),
  documents: z.instanceof(File).optional(),
  goals: z.string(z.string()).optional(),
  softSkills: z.string(z.string()).optional(),
  technicalSkills: z.string(z.string()).optional(),
  preferredIndustry: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const { updateStudentProfile, student } = useGlobal();

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [documents, setDocuments] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const { execute: updateProfileAction, status } = useAction(
    updateStudentProfile,
    {
      onSuccess(data) {
        toast.success("Profile updated successfully!");
      },
      onError(error) {
        console.error("Failed to update profile", error);
        toast.error("Failed to update profile: ");
      },
    }
  );
  const handleLogout = () => {
    // logout("");
    window.location.href = "/";
  };

  const onSubmit = (data: ProfileFormData) => {
    const prev = data;

    const payload = { ...prev, ...data, profileImage, documents };

    updateProfileAction(payload);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setter(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (student) {
      reset({
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        email: student.email || "",
        phoneNumber: student.phoneNumber || "",
        bio: student.bio || "",
        goals: student.goals || "",
        softSkills: student.softSkills || "",
        technicalSkills: student.technicalSkills,
        preferredIndustry: student.preferredIndustry,
      });
    }
  }, [reset, student]);

  return (
    <>
      <div className="mb-8"></div>
      <div className="max-w-5xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center mb-8">
            <label className="flex flex-col items-center cursor-pointer">
              <div className="w-[80px] h-[70px] border-2 border-dashed border-gray-300 rounded-lg p-2 text-center flex flex-col justify-center">
                {profileImage ? (
                  <Image
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile"
                    width={80}
                    height={70}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Upload className="mx-auto mb-1" size={16} />
                    <p className="text-xs">Photo</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setProfileImage)}
                  className="hidden"
                />
              </div>
            </label>
            {errors.profileImage && (
              <p className="text-red-500 text-sm mt-1 ml-4">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <Input
                id="firstName"
                {...register("firstName")}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <Input
                id="lastName"
                {...register("lastName")}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                contentEditable={false}
                disabled
                id="email"
                {...register("email")}
                type="email"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                {...register("phoneNumber")}
                type="tel"
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="softSkills"
                className="block text-sm font-medium text-gray-700"
              >
                Soft Skills
              </label>
              <Input
                id="softSkills"
                {...register("softSkills")}
                type="text"
                placeholder="Soft skills e.g communication, teamwork, leadership"
              />
              {errors.softSkills && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.softSkills.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="technicalSkills"
                className="block text-sm font-medium text-gray-700"
              >
                Technical Skills
              </label>
              <Input
                id="technicalSkills"
                {...register("technicalSkills")}
                type="text"
                placeholder="Technical skills e.g javaScript, react, node.js"
              />
              {errors.technicalSkills && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.technicalSkills.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="preferredIndustry"
                className="block text-sm font-medium text-gray-700"
              >
                Preferred Industry
              </label>
              <Input
                id="preferredIndustry"
                {...register("preferredIndustry")}
                type="text"
                placeholder="Preferred industry e.g., healthcare, IT, education, etc"
              />
              {errors.preferredIndustry && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.preferredIndustry.message}
                </p>
              )}
            </div>{" "}
            <div>
              <label
                htmlFor="goals"
                className="block text-sm font-medium text-gray-700"
              >
                Goals
              </label>
              <Input
                id="goals"
                {...register("goals")}
                type="text"
                placeholder="Goals e.g e. achieve a higher salary, improve my productivity, contribute to open-source projects"
              />
              {errors.goals && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.goals.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio and work Experience
              </label>
              <Textarea
                id="bio"
                {...register("bio")}
                placeholder="Tell us something about you, your goals etc."
                rows={5}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>
            <div>
              <div className="border-2 border-gray-300 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Upload IT request letter
                </h3>
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 my-5 border-dashed rounded-md cursor-pointer p-4">
                  {documents ? (
                    <p>{documents.name}</p>
                  ) : (
                    <>
                      <Upload className="mx-auto mb-2" size={24} />
                      <p className="text-sm text-gray-500 mb-2">Upload</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileChange(e, setDocuments)}
                    className="hidden"
                  />
                </label>

                <div className=" overflow-scroll">
                  <p className=" text-wrap">{student.profileImageUrl}</p>
                  <p>{student.documentUrls}</p>
                </div>

                {student.documentUrls && student.documentUrls.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Your Uploaded Documents:
                    </h4>
                    {student.documentUrls.map((url: string, index: number) => (
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline block"
                      >
                        View IT Letter
                      </a>
                    ))}
                  </div>
                )}

                {errors.documents && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.documents.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="xxs:text-start space-x-2 flex justify-between">
            <div>
              <Button
                type="submit"
                size="sm"
                disabled={status === "executing"}
                className="mx-auto"
              >
                {status === "executing" ? "Updating..." : "Update Profile"}
              </Button>
              <button type="button" className="p-3" onClick={() => reset()}>
                Reset
              </button>
            </div>
            <Button
              size="sm"
              className="hidden md:block"
              onClick={handleLogout}
              type="submit"
            >
              Logout
            </Button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
