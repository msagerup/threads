"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { Thread as ThreadType, userFormData } from "@/types";
import { SortOrder } from "mongoose";
import Thread from "../models/thread.model";

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
        profile_photo,
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

export async function fetchUser(id: string) {
  try {
    await connectToDB();
    return await User.findOne({ id });
  } catch (error: any) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 10,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    await connectToDB();
    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");

    const queryParams = {
      $and: [
        { id: { $ne: userId } },
        {
          $or: [
            { username: { $nin: ["", null], $regex: regex } },
            { name: { $nin: ["", null], $regex: regex } },
          ],
        },
      ],
    };
    const sortOptions = { createdAt: sortBy };

    const query = await User.find(queryParams)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .exec();

    const totalUsersCount = await User.countDocuments(queryParams);
    const isNext = totalUsersCount > skipAmount + query.length;
    return { query, isNext };
  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
}

export async function getNotifications(userId: string) {
  try {
    await connectToDB();

    // Collect all the replies to the user's threads and return them, the replies should be from other users
    const userThreads = await Thread.find({ author: userId });
    const userRepliesIds = userThreads.reduce((acc, thread) => {
      return acc.concat(thread.replies);
    }, []);

    const replies = await Thread.find({
      _id: { $in: userRepliesIds },
      author: { $ne: userId },
    }).populate([
      { path: "author", select: "username name profile_photo" },
      { path: "replies" },
    ]);

    return replies as ThreadType[];
  } catch (error: any) {
    throw new Error(`Error fetching notifications: ${error.message}`);
  }
}
