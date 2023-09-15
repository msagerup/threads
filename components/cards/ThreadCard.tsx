import { Thread } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Share from "../shared/Share";
import ProfileHeader from "../shared/ProfileHeader";
import RepliesPreview from "../shared/RepliesPreview";

const renderSocialLinks = (id: string): ReactNode => {
  // TODO: implement other social links
  return [
    //   { image: "/assets/heart-gray.svg", alt: "heart icon", link: ''},
    { image: "/assets/reply.svg", alt: "reply icon", link: `/thread/${id}` },
    //   { image: "/assets/repost.svg", alt: "repost icon", link: '' },
    //   { image: "/assets/share.svg", alt: "share icon", link: '' },
  ].map(({ image, alt, link }) => {
    return (
      <Link href={link} key={image}>
        <Image
          className='cursor-pointer object-contain'
          src={image}
          alt={alt}
          width={24}
          height={24}
        />
      </Link>
    );
  });
};

const ThreadCard = ({
  thread,
  isComment,
  hidePreview,
}: {
  thread: Thread;
  isComment: boolean;
  hidePreview?: boolean;
}) => {
  //Constants
  const { text, id, author, replies, updatedAt, createdAt } = thread;

  const socialImageLinks = renderSocialLinks(id);

  // console.log('replies', replies )

  return (
    <article
      className={`flex w-full flex-col rounded-lg ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link
              className='relative h-11 w-11'
              href={`/profile/${author?.id}`}
            >
              <Image
                src={author?.profile_photo}
                alt='profile photo'
                fill
                className='cursor-pointer rounded-md'
              />
            </Link>
            <div className='thread-card_bar' />
          </div>
          <div className='flex w-full flex-col'>
            <Link className='w-fit' href={`/profile/${author?.id}`}>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>
                {author?.name}
              </h4>
            </Link>
            <p className='mt-2 text-small-regular text-light-2'>{text}</p>
            <div className={`${isComment && "mb-7"} mt-5 flex flex-col gap-3`}>
              <div className='flex gap-3.5'>
                {socialImageLinks}
                <Share link={`/thread/${id}`} />
              </div>
              {/* Bleh... this is not very readable..TODO: refactor..  */}
              {hidePreview ? (
                replies.length > 0 && (
                  <Link href={`/thread/${id}`}>
                    <p className='mt-1 text-subtle-medium text-gray-1'>{`${
                      replies.length
                    } ${replies.length >= 1 ? "reply" : "replies"} `}</p>
                  </Link>
                )
              ) : (
                <RepliesPreview replies={replies} />
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
