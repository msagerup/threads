"use client";

import { userData } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserCard = ({ user }: { user: userData }) => {
  const { id, name, username, profile_photo } = user;

  return (
    <article className='community-card flex-grow'>
      <div className='flex flex-wrap items-center gap-3'>
        <Link href={`/profile/${id}`} className='relative h-12 w-12'>
          <Image
            src={profile_photo}
            alt='profile'
            fill
            className='rounded-md object-cover'
          />
        </Link>

        <div>
          <Link href={`/communities/${id}`}>
            <h4 className='text-base-semibold text-light-1'>{name}</h4>
          </Link>
          <p className='text-small-medium text-gray-1'>@{username}</p>
        </div>
      </div>

      <p className='mt-4 text-subtle-medium text-gray-1'>{name}</p>
      <div className='mt-5 flex flex-wrap items-center justify-between gap-3'>
        <Link href={`/profile/${id}`}>
          <Button size='sm' className='community-card_btn'>
            View
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default UserCard;
