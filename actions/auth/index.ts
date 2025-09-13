"use server";

import { mutate } from "@/lib/api";
import { actionClient } from "@/lib/safe-action";

import {
  fullCompanySignupSchema,
  signinSchema,
  signupSchema,
} from "@/lib/validations/auth";
import { clearAuthCookies, setAuthCookies } from "@/utils/cookies";

export const signinStudent = actionClient
  .inputSchema(signinSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const response = await mutate("/auth/login", {
      email,
      password,
    });

    console.log(response?.data);

    const { user, company, role, accessToken } = response.data;
    await setAuthCookies(accessToken, user.role);
    return { user, role, company, accessToken };
  });

export const signinCompany = actionClient
  .inputSchema(signinSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const response = await mutate("/company/login", {
      email,
      password,
    });

    console.log(response?.data);

    const { accessToken, user, company, role } = response.data;
    await setAuthCookies(accessToken, company.role);
    return { user, accessToken, role, company };
  });

export const logout = async () => {
  await clearAuthCookies();
};

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
