"use client";

import { userData } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const UserCard = ({ user }: { user: userData }) => {
  const { id, name, username, profile_photo } = user;
  const router = useRouter();

  return (
    <article className='user-card'>
      <div className='user-card_avatar'>
        <Image
          src={profile_photo}
          alt='profile photo'
          width={48}
          height={48}
          className='cursor-pointer rounded-md'
        />
        <div className='flex-1 text-ellipsis '>
          <h4 className='text-base-semibold text-light-1'>{name}</h4>
          <p className='text-small-medium text-gray-1'>@{username}</p>
        </div>
      </div>
      <Button onClick={() => router.push(`/profile/${id}`)}>View</Button>
    </article>
  );
};

export default UserCard;
