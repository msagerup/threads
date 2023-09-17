import PostThread from "@/components/forms/PostThread";
import Spinner from "@/components/shared/Spinner";
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
    <>
      <h1 className='head-text'>create thread</h1>
      <Suspense fallback={<Spinner />}>
        <PostThread userId={userInfo._id.toString()} />
      </Suspense>
    </>
  );
}
