import PostThread from "@/components/forms/PostThread";
import Spinner from "@/components/shared/Spinner";
import { Separator } from '@/components/ui/separator';
import { fetchUser } from "@/lib/actions/user.actions";
import { userData } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function CreateThread() {

  const {userId} = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const userInfo: userData = await fetchUser(userId);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <section>
      <header className='mb-10'>
        <h1 className='head-text'>Create Thread</h1>
        <Separator className='separator' />
        <div className='text-subtle-large text-gray-1 '>
          What&#39;s on your mind?
        </div>
      </header>
      <Suspense fallback={<Spinner />}>
        <PostThread userId={userInfo._id.toString()} />
      </Suspense>
    </section>
  );
}
