//app/page.tsx
import ThreadCard from "@/components/cards/ThreadCard";
import Spinner from "@/components/shared/Spinner";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { Suspense } from "react";

export default async function Home() {
  const results = await fetchThreads();

  return (
    <Suspense fallback={<Spinner />}>
      <section className='mt-9 flex flex-col gap-10'>
        {results.threads.length === 0 ? (
          <p className='no-results'>No threads found</p>
        ) : (
          results.threads.map((thread) => {
            return <ThreadCard key={thread._id} thread={thread} />;
          })
        )}
      </section>
    </Suspense>
  );
}
