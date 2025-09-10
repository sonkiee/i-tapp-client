// src/lib/utils/cookieUtils.ts
"use server";

import { cookies } from "next/headers";

const DEFAULT_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
};

/**
 * Set a cookie
 */
export async function setCookie(
  name: string,
  value: string
  //   options: Partial<Parameters<typeof cookies>[0]["set"]> = {}
) {
  (await cookies()).set(name, value, {
    ...DEFAULT_OPTIONS,
    // ...options,
  });
}

/**
 * Get a cookie value
 */
export async function getCookie(name: string): Promise<string | undefined> {
  return (await cookies()).get(name)?.value;
}

/**
 * Delete a cookie
 */
export async function deleteCookie(name: string) {
  (await cookies()).delete(name);
}
