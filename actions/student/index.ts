import { mutate, query } from "@/lib/api";
import { actionClient } from "@/lib/safe-action";
import { verifyStudentIdentitySchema } from "@/lib/validations/auth";
import z from "zod";

export const fetchAcceptedApplications = actionClient.action(async () => {
  try {
    const response = await query("/student/job/current");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
});

export const fetchJobs = actionClient.action(async () => {
  try {
    const response = await query("/student/jobs");
    const data = await response.json(); // Parse the body
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchApplication = actionClient.action(async () => {
  try {
    const response = await query("/student/applications");
    const data = await response.json(); // Parse the body
    console.log(data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchSavedApplication = actionClient.action(async () => {
  try {
    const response = await query("/student/saved/applications");
    const data = await response.json(); // Parse the body
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

const applyJ = z.object({
  jobId: z.string(),
});

export const apply = actionClient

  .inputSchema(applyJ)
  .action(async ({ parsedInput: { jobId } }) => {
    try {
      const response = await mutate("/student/job/apply", { jobId });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error; // Ensure the error is propagated back to the frontend
    }
  });

export const save = actionClient

  .inputSchema(applyJ)
  .action(async ({ parsedInput: { jobId } }) => {
    try {
      const response = await mutate("/student/saved/applications", { jobId });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error; // Ensure the error is propagated back to the frontend
    }
  });

const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  bio: z.string().optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
});

// Create the action
export const updateProfile = actionClient

  .inputSchema(updateProfileSchema)
  .action(
    async ({
      parsedInput: { firstName, lastName, email, phoneNumber, bio, password },
    }) => {
      try {
        const response = await mutate("/student/profile", {
          firstName,
          lastName,
          email,
          phoneNumber,
          bio,
          password,
        });
        return response.data;
      } catch (error) {
        console.error("Profile update error:", error);
        return {
          success: false,
          message: "Failed to update profile. Please try again.",
        };
      }
    }
  );

export const verifyStudentIdentity = actionClient

  .inputSchema(verifyStudentIdentitySchema)
  .action(async ({ parsedInput: { matNo } }) => {
    // return true;
    const response = await mutate("/student/check", {
      matriculation: matNo,
    });
    console.log(response.data);
    return response.data;
  });
