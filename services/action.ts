"use client";

import axios, { AxiosError } from "axios";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

import { FetchResponse } from "@/types/utils";

export const actionClient = createSafeActionClient({
  handleServerError(e): FetchResponse {
    if (axios.isAxiosError(e)) {
      const err = e as AxiosError;

      if (err.response && err.response.data) {
        const customError = err.response.data as FetchResponse;
        return {
          statusCode: err.response.status,
          message: customError.message ?? customError.error,
        };
      }

      return {
        statusCode: err.response?.status || 500,
        message: err.message,
      };
    }

    return {
      statusCode: 500,
      message: "An error occurred, please try again later!",
    };
  },
});
