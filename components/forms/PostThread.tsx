"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { commentValidation } from "@/lib/validations/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import { createThread } from "@/lib/actions/thread.actions";
import { ObjectId } from "mongoose";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { use } from "react";
import { useOrganization } from "@clerk/nextjs";

const PostThread = ({ userId }: { userId: ObjectId | string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();
  const form = useForm<z.infer<typeof commentValidation>>({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof commentValidation>) => {
    try {
      await createThread({
        thread: values.thread,
        userId: userId,
        community: organization && organization.id,
        path: pathname,
      });
      toast("😎 Thread created", {
        autoClose: 1500,
        type: "success",
        position: "bottom-right",
      });
      router.push("/");
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
    <Form {...form}>
      <form
        className='flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                What&apos;s on your mind?
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-2'>
                <Textarea
                  rows={15}
                  id='thread'
                  placeholder='thread'
                  className='input'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='bg-primary-500'>
          Create thread
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
