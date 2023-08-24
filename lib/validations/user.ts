import * as z from "zod";

export const userValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .nonempty()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(30, { message: "Must be 30 or fewer characters long" }),
  username: z
    .string()
    .nonempty()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(30, { message: "Must be 30 or fewer characters long" }),
  bio: z
    .string()
    .nonempty()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(1000, { message: "Must be 1000 or fewer characters long" }),
});
