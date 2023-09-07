"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { userFormData } from "@/types";

export async function updateUser(
  userId: string,
  path: string,
  values: userFormData
): Promise<void> {

  /*** Consts */
  const { username, name, profile_photo, bio } = values;
  /*** End Consts */

  try {
    await connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        profile_photo: "tes66t",
        bio,
        onboarded: true,
      },
      { upsert: true } // create document if it doesn't exist
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}
