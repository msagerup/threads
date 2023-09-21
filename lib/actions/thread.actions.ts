"use server";

import mongoose, { ObjectId } from "mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import Community from "../models/community.model";
import { replyPopulateOptions } from "./helpers/poluateReplies";

interface createThreadProps {
  thread: string;
  userId: ObjectId | string;
  communityId: string | null | undefined;
  path: string;
}

export async function createThread(values: createThreadProps) {
  const { thread, userId, communityId, path } = values;
  try {
    await connectToDB();

    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );

    const createdThread = await Thread.create({
      text: thread,
      author: userId,
      community: communityIdObject ? communityIdObject._id : null,
    });
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { threads: createdThread._id } }
    );

    if (communityIdObject) {
      // Update Community model
      await Community.findByIdAndUpdate(communityIdObject, {
        $push: { threads: createdThread._id },
      });
    }

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
      .sort({ createdAt: "desc" })
      .skip(offset)
      .limit(pageSize)
      .populate([
        { path: "author", model: User },
        {
          path: "replies",
          model: Thread,
          populate: replyPopulateOptions(2),
        },
        { path: "community", model: Community },
      ]);

    const totalThreadsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const threads = await threadsQuery.exec();

    const isNext = totalThreadsCount > offset + threads.length;

    return { threads, isNext };
  } catch (error: any) {
    throw new Error(`Error fetching thread: ${error.message}`);
  }
}

export async function fetchThreadById(threadId: string) {
  try {
    await connectToDB();
    const thread = await Thread.findById(threadId)
      .populate({ path: "author", model: User })
      .populate({
        path: "replies",
        model: Thread,
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name username parentId profile_photo",
          },
          {
            path: "replies",
            model: Thread,
            populate: replyPopulateOptions(2),
          },
        ],
      })
      .exec();

    return thread;
  } catch (error: any) {
    throw new Error(
      `Error fetching thread Id: => ${threadId}: ${error.message}`
    );
  }
}

export async function fetchThreadByUserId(userId: string) {
  try {
    await connectToDB();
    const threads = await User.find({ _id: userId })
      .populate({
        path: "threads",
        model: Thread,
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name username parentId profile_photo",
          },
          {
            path: "replies",
            model: Thread,
            populate: replyPopulateOptions(2),
          },
        ],
      })
      .populate({ path: "communities", model: Community })
      .exec();

    return threads;
  } catch (error: any) {
    throw new Error(
      `Error fetching thread by user: ${userId} => ${error.message}`
    );
  }
}

export async function addCommentToThread({
  threadId,
  commentText,
  userId,
  path,
}: {
  threadId: string;
  commentText: string;
  userId: string;
  path: string;
}) {
  // Start a session, create a comment, add comment to thread, add comment to user
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const thread = await Thread.findById(threadId).session(session);

    if (!thread) {
      throw new Error(`Thread not found: ${threadId}`);
    }

    const comment = await Thread.create(
      [
        {
          text: commentText,
          author: userId,
          parentId: threadId,
        },
      ],
      { session }
    );

    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }

    if (!user.user_replies) {
      user.user_replies = [];
    }
    user.user_replies.push(comment[0]._id);
    await user.save();

    thread.replies.push(comment[0]._id);
    await thread.save();

    await session.commitTransaction();
    revalidatePath(path);
  } catch (error: any) {
    await session.abortTransaction();
    throw new Error(
      `Error adding comment to thread: ${threadId} => ${error.message}`
    );
  } finally {
    session.endSession();
  }
}
