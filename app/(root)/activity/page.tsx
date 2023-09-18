import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { fetchUser, getNotifications } from "@/lib/actions/user.actions";
import { Thread, userData } from "@/types";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Activity = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }
  const userInfo: userData = await fetchUser(user.id);

  const results = await getNotifications(userInfo._id.toString());

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }
  return (
    <section>
      <h1 className='head-text mb-10'>Activity</h1>
      <Suspense fallback={<Spinner />}>
        <section className='mt-10 flex flex-col gap-5'>
          {results.length === 0 ? (
            <>
              <p className='!text-base-regular text-light-3'>
                No activity to your threads yet, keep on posting!
              </p>
              <Link href='/create-thread' passHref>
                <Button>Create new thread</Button>
              </Link>
            </>
          ) : (
            results.map((reply) => (
              <Link
                href={`/thread/${reply.parentId}`}
                key={reply._id.toString()}
              >
                <article className='activity-card'>
                  <Image
                    className='rounded-md object-cover'
                    src={reply.author.profile_photo}
                    alt='profile photo'
                    width={20}
                    height={20}
                  />
                  <p className='!text-small-regular text-light-1'>
                    <span className='mr-1 text-primary-500'>
                      {reply.author.name}
                    </span>
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))
          )}
        </section>
      </Suspense>
    </section>
  );
};

export default Activity;
