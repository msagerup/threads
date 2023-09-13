import * as z from "zod";

export const threadValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  thread: z
    .string()
    .nonempty()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(300, { message: "Must be 300 or fewer characters long" }),
});
