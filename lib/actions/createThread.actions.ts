"use server";

import { ObjectId } from "mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

interface createThreadValues {
  thread: string;
  userId: ObjectId | string;
  commnunity: string;
  path: string;
}

export async function createThread(values: createThreadValues) {
  const { thread, userId, commnunity, path } = values;
  try {
    await connectToDB();
    const createdThread = await Thread.create({
      text: thread,
      author: userId,
      commnunity,
    });
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { threads: createdThread._id } }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating thread: ${error.message}`);
  }
}
