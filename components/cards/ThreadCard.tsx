import { Thread } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Share from "../shared/Share";
import RepliesPreview from "../shared/RepliesPreview";
import { formatDateString } from "@/lib/utils";
import dynamic from "next/dynamic";
import Spinner from "../shared/Spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Code spitting
const AsyncPreview = dynamic(() => import("@/components/shared/AsyncPreview"), {
  ssr: false,
  loading: () => <Spinner isComponent size={30} />,
});

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
  isLeadThread,
  isReplyTab,
}: {
  thread: Thread;
  isComment?: boolean;
  hidePreview?: boolean;
  isLeadThread?: boolean;
  isReplyTab?: boolean;
}) => {
  //Constants
  const { text, id, author, community, replies, updatedAt, createdAt } = thread;
  const socialImageLinks = renderSocialLinks(id);

  const renderReplies = () => {
    // Disables preview popup within preview pop-up's
    if (hidePreview) {
      return null;
    }

    if (replies.length === 0) {
      return null;
    }
    // Hides replies if it is the lead thread, since it is already displayed
    if (isLeadThread) {
      return null;
    }

    return (
      <Link href={`/thread/${id}`}>
        <p className='mt-1 text-subtle-medium text-gray-1'>
          {`${replies.length} ${replies.length >= 2 ? "replies" : "reply"}`}
        </p>
      </Link>
    );
  };

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
                src={
                  author?.profile_photo
                    ? author?.profile_photo
                    : "/assets/profile.svg"
                }
                alt='profile photo'
                fill
                className='cursor-pointer rounded-md'
              />
            </Link>
            {(replies.length !== 0 || isComment)  && (
              <div className='thread-card_bar' />
            )}
            
          </div>
          <div className='flex w-full flex-col'>
            <div className='flex items-center w-full flex-row'>
              <Link className='w-fit' href={`/profile/${author?.id}`}>
                <h4 className='cursor-pointer text-base-semibold text-light-1'>
                  {author?.name}
                </h4>
              </Link>
              {isReplyTab && (
                <div className='ml-1'>
                  <span className='text-subtle-medium text-gray-1'>
                    - Replied to: <AsyncPreview id={id} text={id} />
                  </span>
                </div>
              )}
            </div>
            <p className='text-subtle-medium text-gray-1 mt-0.5'>
              @{author?.username}{" "}
              <span className='visible md:invisible'>
                - {formatDateString(createdAt)}
              </span>
            </p>

            <p className='text-subtle-medium text-gray-1'></p>
            <p className='mt-5 text-small-regular text-light-2'>{text}</p>

            <div className={`${isComment && "mb-5"} mt-3 flex flex-col gap-3`}>
              <TooltipProvider delayDuration={200}>
                <div className='flex gap-3.5'>
                 {!isLeadThread &&  <Tooltip>
                    <TooltipTrigger>{socialImageLinks}</TooltipTrigger>
                    <TooltipContent side='left'>
                      <p className='text-small-regular'>Comment on this thread</p>
                    </TooltipContent>
                  </Tooltip>}

                  <Tooltip>
                    <TooltipTrigger>
                      <Share link={`/thread/${id}`} />
                    </TooltipTrigger>
                    <TooltipContent side='right'>
                      <p className='text-small-regular'>Share thread link</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <p className=' mt-5 text-subtle-medium text-gray-1 max-md:hidden '>
          {formatDateString(createdAt)}
        </p>
      </div>
      {hidePreview && id ? (
        renderReplies()
      ) : (
        <RepliesPreview replies={replies} id={id} />
      )}
      {/* 
      {!isComment && community && (
        <Link
          className='mt-5 flex items-center'
          href={`/community/${community?.id}`}
        >
          <p className='text-subtle-medium text-gray-1'>
            {formatDateString(createdAt)}- {community?.name} Community
          </p>
          {community?.profile_photo && (
            <Image
              className='ml-1 rounded-md object-cover'
              src={community?.profile_photo}
              alt='community photo'
              width={14}
              height={14}
            />
          )}
        </Link>
      )} */}
    </article>
  );
};

export default ThreadCard;
