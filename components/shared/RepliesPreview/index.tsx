import { Thread } from "@/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area"
import ThreadCard from "@/components/cards/ThreadCard";
const RepliesPreview = ({ replies }: { replies: Thread[] }) => {

  if(!replies?.length) return null

  return (
    <>
      <HoverCard>
        <HoverCardTrigger className='mt-1 text-subtle-medium text-gray-1 cursor-pointer '>
          {replies.length}
          {` ${replies.length > 1 ? "replies" : "reply"}`}
        </HoverCardTrigger>

        <HoverCardContent align='start' className='bg-dark-2 w-[650px] '>
          <ScrollArea className="h-[200px]">
          {replies?.map((reply) => {
            return (
              <ThreadCard key={reply.id} thread={reply} hidePreview={true} />
            );
          })}
         </ScrollArea>
        </HoverCardContent>
       
      </HoverCard>
    </>
  );
};

export default RepliesPreview;
