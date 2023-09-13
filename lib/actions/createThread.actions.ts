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

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  try {
    await connectToDB();

    // Calculate offset using page number and page size
    const offset = pageSize * (pageNumber - 1);

    // Fetch threads that have no parents
    const threadsQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
    .sort({ createdAt: 'desc' })
    .skip(offset)
    .limit(pageSize)
    .populate({path: 'author', model: User})
    .populate({
      path: 'replies',
      model: Thread,
      populate: {
        path: 'author',
        model: User,
        select: '_id name username profile_photo'
      }
    })

    const totalThreadsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] }
    })

    const threads = await threadsQuery.exec();
    const isNext = totalThreadsCount > offset + threads.length;

    return {threads, isNext};

  } catch (error: any) {
    throw new Error(`Error fetching thread: ${error.message}`);
  }
}
