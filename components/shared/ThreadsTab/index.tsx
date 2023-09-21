// import ThreadCard from "@/components/cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchThreadByUserId } from "@/lib/actions/thread.actions";
import { Thread, Threads } from "@/types";
import dynamic from 'next/dynamic';
import Spinner from '../Spinner';

// Code splitting with loader
const ThreadCard = dynamic(() => import('@/components/cards/ThreadCard'), {
  loading: () => <Spinner isComponent size={30} />,
  ssr: false, 
});


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
  const authorThreads = accountType
    ? await fetchCommunityPosts(profileId)
    : await fetchThreadByUserId(profileId);

  if (!authorThreads || !Array.isArray(authorThreads))
    return (
      <p className='!text-base-regular text-light-3 mt-10 '>
        No activity here yet, keep on posting!
      </p>
    );

  const threads: Threads = authorThreads[0].threads

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {threads &&
        threads.map((thread: Thread) => {
          return <ThreadCard key={thread.id} thread={thread} />;
        })}
    </section>
  );
};

export default ThreadsTab;
