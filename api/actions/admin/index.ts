"use server";

import { companyIdSchema } from "@/lib/validations/auth";
import { actionClient } from "@/services/action";
import { mutate } from "@/services/query";

// Create the server actions
