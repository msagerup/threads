import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/CommentForm";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { Thread } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ThreadDetails = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const [userInfo, thread] = await Promise.all([
    fetchUser(userId),
    fetchThreadById(id),
  ]);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <section className='relative'>
      <div>
        <ThreadCard thread={thread} hidePreview={true} isLeadThread={true} />
      </div>

      <div className='mt-7'>
        <Comment
          threadId={thread._id.toString()}
          userProfilePhoto={userInfo.profile_photo}
          userId={userInfo._id.toString()}
        />
      </div>
      <div className='mt-10'>
        {thread.replies.map((reply: Thread) => {
          return <ThreadCard key={reply._id} thread={reply} isComment={true} />;
        })}
      </div>
    </section>
  );
};

export default ThreadDetails;
