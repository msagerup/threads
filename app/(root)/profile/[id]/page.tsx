import RepliesTab from "@/components/shared/RepliesTab";
import Spinner from "@/components/shared/Spinner";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import Image from "next/image";

const DynamicHeader = dynamic(
  () => import("@/components/shared/ProfileHeader"),
  { loading: () => <Spinner /> }
);

import { redirect } from "next/navigation";
import { Suspense } from "react";

const Profile = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [user, profileData] = await Promise.all([currentUser(), fetchUser(id)]);

  if (!user) {
    redirect("/sign-in");
  }

  if (!profileData?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <Suspense fallback={<Spinner />}>
      <section>
        <DynamicHeader loggedInUserId={user.id} profile={profileData} />
        <div className='mt-9'>
          <Tabs defaultValue='threads' className='w-full'>
            <TabsList className='tab'>
              {profileTabs.map((tab) => {
                return (
                  <TabsTrigger
                    key={tab.label}
                    value={tab.value}
                    className='tab'
                  >
                    <Image
                      src={tab.icon}
                      alt={tab.label}
                      width={24}
                      height={24}
                      className='object-contain'
                    />
                    <p className='max-sm:hidden'>{tab.label}</p>
                    {tab.label === "Threads" && (
                      <p className='ml-1 rounded-md bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                        {profileData?.threads?.length}
                      </p>
                    )}
                    {tab.label === "Replies" && (
                      <p className='ml-1 rounded-md bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                        {profileData?.user_replies.length}
                      </p>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent className='w-full text-light-1' value='threads'>
              <ThreadsTab
                currentUserId={user.id}
                profileId={profileData._id.toString()}
              />
            </TabsContent>
            <TabsContent className='w-full text-light-1' value='replies'>
              <RepliesTab replies={profileData?.user_replies.toObject()} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Suspense>
  );
};

export default Profile;
