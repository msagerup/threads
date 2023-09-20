import ThreadCard from "@/components/cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchThreadByUserId } from "@/lib/actions/thread.actions";
import { Thread, Threads } from "@/types";

const ThreadsTab = async ({
  currentUserId,
  profileId,
  accountType,
}: {
  currentUserId: string;
  profileId: string;
  accountType?: "Community";
}) => {
  // TODO: add union type
  const threads = accountType
    ? await fetchCommunityPosts(profileId)
    : await fetchThreadByUserId(profileId);

  if (!threads || !Array.isArray(threads))
    return (
      <p className='!text-base-regular text-light-3 mt-10 '>
        No activity here yet, keep on posting!
      </p>
    );

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {threads &&
        threads?.map((thread) => {
          return <ThreadCard key={thread.id} thread={thread} />;
        })}
    </section>
  );
};

export default ThreadsTab;
