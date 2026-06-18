import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: z.string().min(1),
    NEXT_PUBLIC_CONTACT_FORM_URL: z.string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
    NEXT_PUBLIC_CONTACT_FORM_URL: process.env.NEXT_PUBLIC_CONTACT_FORM_URL,
  },
  emptyStringAsUndefined: true,
});
