import Thread from '@/lib/models/thread.model';
import User from '@/lib/models/user.model';

export const replyPopulateOptions = (depth: number): any[] => [
    {
      path: "author",
      model: User,
      select: "_id id name username parentId profile_photo",
    },
    {
      path: "replies",
      model: Thread,
      populate: depth > 0 ? replyPopulateOptions(depth - 1) : [],
    },
  ];