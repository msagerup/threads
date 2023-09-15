import { Thread } from "@/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import ThreadCard from "@/components/cards/ThreadCard";
const RepliesPreview = ({ replies }: { replies: Thread[] }) => {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger className='mt-1 text-subtle-medium text-gray-1 '>
        {replies.length} replies
        </HoverCardTrigger>

        <HoverCardContent align='start' className='bg-dark-2 w-96 '>
          {replies?.map((reply) => {
            return (
              <ThreadCard key={reply.id} thread={reply} hidePreview={true} />
            );
          })}
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

export default RepliesPreview;
