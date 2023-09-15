"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentValidation } from "@/lib/validations/comment";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface CommentProps {
  threadId: string;
  userProfilePhoto: string;
  userId: string;
}

const Comment = ({ threadId, userProfilePhoto, userId }: CommentProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof commentValidation>>({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof commentValidation>) => {
    try {
      await addCommentToThread({
        threadId,
        commentText: values.thread,
        userId: userId,
        path: pathname,
      });
      form.reset();
      toast("Comment added👍", {
        autoClose: 1500,
        type: "success",
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error, "error");
      toast("Obs... Something went wrong, please try again.", {
        autoClose: 5000,
        type: "error",
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='thread'
            render={({ field }) => (
              <FormItem className='flex w-full items-center gap-3'>
                <FormLabel>
                  <Image
                    className='rounded-md object-cover'
                    src={userProfilePhoto}
                    alt='profile photo'
                    height={48}
                    width={48}
                  />
                </FormLabel>
                <FormControl className='border-none bg-transparent'>
                  <Input
                    type='text'
                    id='thread'
                    placeholder='Comment...'
                    className='no-focus text-light-1 outline-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='comment-form_btn'>
            Reply
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Comment;
