"use server";

import { z } from "zod";
// import { actionClient } from "@/services/action";
import {
  verifyStudentIdentitySchema,
  signinSchema,
  createSpaceSchema,
  signupSchema,
  acceptSchema,
  fullCompanySignupSchema,
  logoutSchema,
  companyIdSchema,
} from "@/lib/validations/auth";
import { mutate, query } from "@/services/query";
import { cookies } from "next/headers";
import { actionClient } from "@/lib/safe-action";

export const approveCompany = actionClient
  .inputSchema(companyIdSchema)
  .action(async ({ parsedInput: { companyId } }) => {
    try {
      const response = await mutate(`/admin/company/approve`, { companyId });
      return { success: true, data: response };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: error || "Failed to approve company",
      };
    }
  });

export const declineCompany = actionClient
  .inputSchema(companyIdSchema)
  .action(async ({ parsedInput: { companyId } }) => {
    try {
      const response = await mutate(`/admin/company/decline`, { companyId });
      return { success: true, data: response };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: error || "Failed to decline company",
      };
    }
  });

export const signinStudent = actionClient

  .inputSchema(signinSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const response = await mutate("/auth/login", {
      email,
      password,
    });

    console.log(response?.data);

    const { accessToken, user, company, role } = response.data.data;

    // const { role} = response.data.data

    // Set the token in an HTTP-only cookie
    (await cookies()).set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { user, accessToken, role, company };
  });

export const signinCompany = actionClient

  .inputSchema(signinSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const response = await mutate("/company/login", {
      email,
      password,
    });

    const { accessToken, user, company, role } = response.data.data;

    // const { role} = response.data.data

    // Set the token in an HTTP-only cookie
    (await cookies()).set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { user, accessToken, role, company };
  });

export const logout = actionClient.schema(logoutSchema).action(async ({}) => {
  (await cookies()).set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  return {};
});

export const studentSignup = actionClient

  .inputSchema(signupSchema)
  .action(
    async ({
      parsedInput: {
        email,
        firstName,
        lastName,
        password,
        matriculation,
        school,
      },
    }) => {
      console.log(email);
      try {
        const response = await mutate("/auth/student/signup", {
          firstName,
          lastName,
          email,
          password,
          matriculationNumber: matriculation,
          school,
        });

        console.log(response);
      } catch (error) {
        console.log(error);

        throw error;
      }
    }
  );

export const companySignup = actionClient

  .inputSchema(fullCompanySignupSchema)
  .action(
    async ({
      parsedInput: {
        address,
        company_name,
        email,
        it_duration,
        password,
        rc_number,
        student_capacity,
        year_founded,
      },
    }) => {
      const response = await mutate("/company/create", {
        address,
        company_name,
        email,
        it_duration,
        password,
        rc_number,
        student_capacity,
        year_founded,
      });

      console.log(response.data);

      return response.data;
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

// export const companySignup = actionClient
//   .metadata({ actionName: "companySignup" })
//   .action(async ({ parsedInput: { email, password } }) => {
//     await mutate("/company/create", { email, password });
//   });

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

export const fetchAllCompanyApplications = actionClient.action(async () => {
  try {
    const response = await query("/company/all/category");
    const data = await response.json(); // Parse the body

    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchCompanyJobs = actionClient.action(async () => {
  try {
    const response = await query("/company/jobs/all");
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

export const acceptApplication = actionClient

  .inputSchema(acceptSchema)
  .action(async ({ parsedInput: studentId }) => {
    try {
      const response = await mutate(`/company/applicants/accept/`, studentId);
      console.log("Application Response:", response.data);
      return response.data;
    } catch (error) {
      console.log(error);

      throw error; // Ensure the error is propagated back to the frontend
    }
  });

export const declineApplication = actionClient

  .inputSchema(acceptSchema)
  .action(async ({ parsedInput: studentId }) => {
    try {
      const response = await mutate(`/company/applicants/accept/`, studentId);

      return response.data;
    } catch (error) {
      console.log(error);

      throw error; // Ensure the error is propagated back to the frontend
    }
  });

export const bookmarkApplication = actionClient
  .inputSchema(acceptSchema)

  .action(async ({ parsedInput: studentId }) => {
    try {
      const response = await mutate(`/company/applicants/accept/`, studentId);

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

export const createSpace = actionClient

  .inputSchema(createSpaceSchema)
  .action(
    async ({
      parsedInput: {
        title,
        level,
        duration,
        address,
        city,
        state,
        description,
        industry,
      },
    }) => {
      try {
        const response = await mutate("/company/job/new", {
          title,
          level,
          duration,
          address,
          city,
          state,
          description,
          industry,
        });

        return response.data;
      } catch (error) {
        console.log(error);
        throw error; // Ensure the error is propagated back to the frontend
      }
    }
  );

export const updateSpace = actionClient

  .inputSchema(createSpaceSchema)
  .action(
    async ({
      parsedInput: {
        id,
        title,
        level,
        duration,
        address,
        city,
        state,
        description,
        industry,
      },
    }) => {
      try {
        const response = await mutate(
          `/company/job/update/${id}`,
          {
            id,
            title,
            level,
            duration,
            address,
            city,
            state,
            description,
            industry,
          },
          "PUT"
        );
        console.log(response);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error; // Ensure the error is propagated back to the frontend
      }
    }
  );

// Define the input schema
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

export const updateCompanyProfile = actionClient.action(async () => {
  try {
    return {
      success: true,
      message: "Company profile updated successfully.",
    };
  } catch (error) {
    console.error("Error updating company profile:", error);
    return {
      success: false,
      message: "Failed to update company profile. Please try again.",
    };
  }
});
