import { userData } from "@/types";
import Image from "next/image";

interface ProfileHeaderProps {
  loggedInUserId: string;
  profile: userData;
}

const ProfileHeader = ({ loggedInUserId, profile }: ProfileHeaderProps) => {
  const { _id, profile_photo, username, name, bio } = profile;

  return (
    <div className='flex w-full flex-col justify-start'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className=' relative h-20 w-20 object-cover'>
            <Image
              src={profile_photo}
              alt='profile'
              fill
              className='rounded-md object-cover shadow-2xl'
            />
          </div>
          <div className='flex-1'>
            <h2 className='text-left text-heading3-bold text-light-2'>
              {name}
            </h2>
            <p className='text-base-medium text-gray-1'>@{username}</p>
          </div>
        </div>
      </div>
      {/* TODO : Add communities */}
      <p className='mt-6 max-w-lg text-base-regular text-light-2'>
        {bio}
      </p>
      {/* Line */}
      <div className='mt-12 h-0.5 w-full bg-dark-3' />
    </div>
  );
};

export default ProfileHeader;
