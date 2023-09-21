import { Separator } from '@/components/ui/separator';
import { fetchThreads } from "@/lib/actions/thread.actions";
import dynamic from 'next/dynamic';

const ThreadCard = dynamic(() => import('@/components/cards/ThreadCard'))

export default async function Home() {
  const results = await fetchThreads();
  return (
      <section className='flex flex-col gap-10'>
        <div>
        <h1 className='head-text'>Threads</h1>
        <Separator className='separator' />
        <div className='text-subtle-large text-gray-1'>Where Every Post is a Stitch</div>
        </div>
        {results.threads.length === 0 ? (
          <p className='no-results'>No threads found</p>
        ) : (
          results.threads.map((thread) => {
            return <ThreadCard key={thread._id} thread={thread} />;
          })
        )}
      </section>
    
  );
}
