import { Thread } from "@/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchThreadByParentId } from "@/lib/actions/thread.actions";

import ThreadCard from "@/components/cards/ThreadCard";

const AsyncPreview = async ({
  id,
  text = "View",
}: {
  id: string;
  text?: string;
}) => {
  const thread = await fetchThreadByParentId(id);

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger className=' text-subtle-medium text-gray-1 cursor-pointer '>
        <span className='mr-1 text-primary-500'>{text}</span>
      </HoverCardTrigger>
      <HoverCardContent align='start' className='bg-dark-2 w-[650px] '>
        <ScrollArea className='h-[200px]'>
          <ThreadCard thread={thread} />
        </ScrollArea>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AsyncPreview;
