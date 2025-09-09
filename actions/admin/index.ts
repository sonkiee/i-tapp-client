import { mutate } from "@/lib/api";
import { actionClient } from "@/lib/safe-action";
import { companyIdSchema } from "@/lib/validations/auth";

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

// export const logout = actionClient.schema(logoutSchema).action(async ({}) => {
//   (await cookies()).set("token", "", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     expires: new Date(0),
//     path: "/",
//   });

//   return {};
// });
