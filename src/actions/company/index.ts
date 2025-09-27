import { mutate, query } from "@/lib/api";
import { actionClient } from "@/lib/safe-action";
import { acceptSchema, createSpaceSchema } from "@/lib/validations/auth";

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
