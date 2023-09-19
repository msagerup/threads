import { Thread } from "@/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ThreadCard from "@/components/cards/ThreadCard";
import Image from "next/image";
import Link from "next/link";
const RepliesPreview = async ({
  replies,
  id,
}: {
  replies: Thread[];
  id: string;
}) => {
  if (!replies?.length) return null;

  return (
    <>
      
        <HoverCard>
          <HoverCardTrigger className=' text-subtle-medium text-gray-1 cursor-pointer '>
            <Link href={`/thread/${id}`}>
            {replies.length > 0 && (
              <div className='ml-2 flex items-center gap-2'>
                {replies.slice(0, 2).map((replies, index) => (
                  <Image
                    key={index}
                    src={replies.author?.profile_photo}
                    alt={`user_${index}`}
                    width={24}
                    height={24}
                    className={`${
                      index !== 0 && "-ml-5"
                    } rounded-md object-cover`}
                  />
                  
                ))}

                <p className='mt-1 text-subtle-medium text-gray-1'>
                  {replies.length}
                  {` ${replies.length > 1 ? "replies" : "reply"}`}
                </p>
                
              </div>
            )}
            </Link>
            
            <div className='thread-card_bar' /> 
          
          </HoverCardTrigger>

          <HoverCardContent align='start' className='bg-dark-2 w-[650px] '>
            <ScrollArea className='h-[200px]'>
              {replies?.map((reply) => {
                return (
                  <ThreadCard
                    key={reply.id}
                    thread={reply}
                    hidePreview={true}
                  />
                );
              })}
            </ScrollArea>
          </HoverCardContent>
        </HoverCard>
      
    </>
  );
};

export default RepliesPreview;
