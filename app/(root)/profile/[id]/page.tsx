import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { userData } from "@/types";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

import { redirect } from "next/navigation";

const Profile = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }
  const profileData: userData = await fetchUser(id);

  if (!profileData) {
    return null;
  }

  return (
    <section>
      <ProfileHeader loggedInUserId={user.id} profile={profileData} />
      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {profileTabs.map((tab) => {
              return (
                <TabsTrigger key={tab.label} value={tab.value} className='tab'>
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
                </TabsTrigger>
              );
            })}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              className='w-full text-light-1'
              key={`content-${tab.label}`}
              value={tab.value}
            >
              <ThreadsTab
                currentUserId={user.id}
                profileId={profileData._id.toString()}
              />
            </TabsContent>
          ))}
          )
        </Tabs>
      </div>
    </section>
  );
};

export default Profile;
