"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { companyProfileSchema } from "@/lib/validations/auth";
import { useGlobal } from "@/context/GlobalContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

type ProfileFormData = z.infer<typeof companyProfileSchema>;

export default function ProfileForm() {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);

  const { updateCompanyProfile, company } = useGlobal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(companyProfileSchema),
  });

  const { execute: updateProfileAction, status } = useAction(
    updateCompanyProfile,
    {
      onSuccess(data) {
        toast.success("Company profile updated successfully.");
      },
      onError(error) {
        console.error("Failed to update profile", error);
        toast.error("Failed to update company profile. Please try again.");
      },
    }
  );

  const onSubmit = (data: ProfileFormData) => {
    const prev = data;

    const payload = { ...prev, ...data, profileImage, backgroundImage };

    updateProfileAction(payload);
    updateProfileAction(data);
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
    if (company) {
      reset({
        ...company,
        profileImage: company.profileImageUrl,
        backgroundImage: company.backgroundImage,
      });
    }
  }, [company, reset]);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Banner Upload */}
        <div className="mb-8">
          <label className="block w-full h-40 bg-gray-200 my-5 rounded-md flex items-center justify-center cursor-pointer">
            {backgroundImage ? (
              <Image
                src={URL.createObjectURL(backgroundImage)}
                alt="Banner"
                width={300}
                height={150}
                className="w-full h-full object-cover rounded-md"
              />
            ) : company.backgroundImageUrl ? (
              <Image
                src={company.backgroundImageUrl}
                alt="Banner"
                width={300}
                height={150}
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <div className="text-center">
                <Upload className="mx-auto mb-2" size={48} />
                <p className="text-gray-600">Click to upload banner image</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setBackgroundImage)}
              className="hidden"
            />
          </label>
          {/* {errors.backgroundImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.backgroundImage.message}
            </p>
          )} */}
        </div>

        {/* Profile Picture Upload */}
        <div className="flex items-center mb-8">
          <label className="flex flex-col items-center cursor-pointer">
            <div className="w-[80px] h-[70px] border-2 border-dashed border-gray-300 rounded-lg p-2 text-center flex flex-col justify-center">
              {profileImage ? (
                <Image
                  src={
                    URL.createObjectURL(profileImage) || company.profileImageUrl
                  }
                  alt="Profile"
                  width={80}
                  height={70}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : company.profileImageUrl ? (
                <Image
                  src={company.profileImageUrl}
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
          {/* {errors.profileImage && (
            <p className="text-red-500 text-sm mt-1 ml-4">
              {errors.profileImage.message}
            </p>
          )} */}
        </div>

        {/* Form Fields with Labels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Company Website */}
          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Company Website
            </label>
            <Input
              id="website"
              {...register("website")}
              placeholder="Enter your company website"
            />
            {errors.website && (
              <p className="text-red-500 text-sm mt-1">
                {errors.website.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <Input
              id="address"
              {...register("address")}
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Student Capacity */}
          <div>
            <label
              htmlFor="student_capacity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Student Capacity
            </label>
            <Input
              id="student_capacity"
              type="number"
              {...register("student_capacity", { valueAsNumber: true })}
              placeholder="Enter student capacity"
            />
            {errors.student_capacity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.student_capacity.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Enter a description of your company or services"
            rows={5}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Form Buttons */}

        <div className="xxs:text-start space-x-2">
          <Button
            type="submit"
            size="sm"
            disabled={isSubmitting || status === "executing"}
            className="mx-auto"
          >
            {isSubmitting || status === "executing"
              ? "Updating..."
              : "Update Profile"}
          </Button>
          <button type="button" className="p-3" onClick={() => reset()}>
            Reset
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
