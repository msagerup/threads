// import ThreadCard from "@/components/cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchThreadByUserId } from "@/lib/actions/thread.actions";
import { Thread, Threads } from "@/types";
import dynamic from 'next/dynamic';
import Spinner from '../Spinner';

// Code splitting with loader
const ThreadCard = dynamic(() => import('@/components/cards/ThreadCard'), {
  loading: () => <Spinner isComponent size={30} />,
});

const RepliesTab = async ({
  replies,
}: {
    replies: Thread[];
}) => {
  
    if (!replies || !Array.isArray(replies))
    return (
      <p className='!text-base-regular text-light-3 mt-10 '>
        No replies here yet.
      </p>
    );
  return (
    <section className='mt-9 flex flex-col gap-10'>
      {replies &&
        replies.map((thread: Thread) => {
          return <ThreadCard key={thread.id} thread={thread} isReplyTab={true}/>;
        })}
    </section>
  );
};

export default RepliesTab;
