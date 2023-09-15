

import ThreadCard from '@/components/cards/ThreadCard';
import { fetchThreadByUserId } from '@/lib/actions/thread.actions';
import { Threads } from '@/types';

const ThreadsTab = async ({
  currentUserId,
  profileId,
}: {
  currentUserId: string;
  profileId: string;
}) => {

    const threads = await fetchThreadByUserId(profileId)
    console.log(threads);

    if (!threads) {
      return null;
    }

  return (
    <section className='mt-9 flex flex-col gap-10'>
       {threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
        ))}
    
    </section>
  )
};

export default ThreadsTab;