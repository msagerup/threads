import AccountProfileForm from "@/components/forms/AccountProfileForm";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-up");
  }
  console.log('USER', user)

  const userInfo = await fetchUser(user.id);

  if (userInfo?.onboarded) {
    redirect("/");
  }

const userInfoCondensed = {
  id: user?.id,
  username: user?.username,
  name:user?.firstName + ' ' + user?.lastName,
  bio: user?.bio,
  profile_photo:user?.imageUrl 
}


console.log('USERINFO', userInfoCondensed)
  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Onboarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile to get started with Threads
      </p>
      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfileForm user={userInfoCondensed} btnTitle='Continue' />
      </section>
    </main>
  );
}

export default Page;
