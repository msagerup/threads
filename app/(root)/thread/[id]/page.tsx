import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/CommentForm";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { Thread } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ThreadDetails = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  // get thread by id
  const thread: Thread = await fetchThreadById(id);

  return (
    <section className='relative'>
      <div>
        <ThreadCard key={thread._id} thread={thread} hidePreview={true} isLeadThread={true}/>
      </div>

      <div className='mt-7'>
        <Comment
          threadId={thread._id.toString()}
          userProfilePhoto={userInfo.profile_photo}
          userId={userInfo._id.toString()}
        />
      </div>
      <div className='mt-10'>
        {thread.replies.map((reply) => {
          return <ThreadCard key={reply._id} thread={reply} isComment={true}  />;
        })}
      </div>
    </section>
  );
};

export default ThreadDetails;
