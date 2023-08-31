"use client";

import { userData } from "@/types";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/lib/validations/user";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";

interface AccountProfileFormProps {
  user: userData;
  btnTitle: string;
}

const AccountProfileForm = ({ user, btnTitle }: AccountProfileFormProps) => {
  const [file, setfile] = useState<File[]>([]);
  const { startUpload } = useUploadThing('media')

  const defaultValues = {
    profile_photo: user?.image || "",
    username: user.username || "",
    name: user.name || "",
    bio: user.bio || "",
  };

  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: defaultValues,
  });

  
  //Handle Image upload
  const handleImage = (
    event: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    event.preventDefault();
    const fileReader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        fieldChange(fileReader.result as string);
      };
      setfile((prev) => [...prev, file]);
    }
  };

  const onSubmit = async (values: z.infer<typeof userValidation>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const blob = values.profile_photo;
    const isValidIamge = isBase64Image(blob);
    console.log(isValidIamge)
   
    if (isValidIamge) {
      const imgRes = await startUpload(file);

      if (imgRes && imgRes[0].fileUrl) {
        values.profile_photo = imgRes[0].fileUrl;
      } 
    }

    // TODO: // Update user profile ...
  };



  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col justify-start gap-8'
      >
        <FormField
          control={form.control}
          name='profile_photo'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4 '>
              <FormLabel className='account-form_image-label '>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt='profile photo'
                    width={80}
                    height={80}
                    priority
                    className='rounded-full object-contain '
                  />
                ) : (
                  <Image
                    src='/assets/profile.svg'
                    alt='profile photo'
                    width={24}
                    height={24}
                    className='rounded-full object-contain'
                  />
                )}
              </FormLabel>
              <FormControl className='flex-1 text-base-semi-bold text-gray-200'>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Upload a photo'
                  className='account-form_image-input cursor-pointer'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormDescription>
                Upload a photo that represents you
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='items-center gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Name
              </FormLabel>
              <FormControl className='flex-1 text-base-semi-bold text-gray-200'>
                <Input
                  type='text'
                  placeholder='Your name'
                  className='account-form_input'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter your name as you want others to see it
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='items-center gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Username
              </FormLabel>
              <FormControl className='flex-1 text-base-semi-bold text-gray-200'>
                <Input
                  type='text'
                  placeholder='user name'
                  className='account-form_input'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Pick a username that you can share with others
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem className='items-center gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Bio
              </FormLabel>
              <FormControl className='flex-1 text-base-semi-bold text-gray-200'>
                <Textarea
                  rows={10}
                  placeholder='Your bio'
                  className='account-form_input'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Tell others a little about yourself
              </FormDescription>
            </FormItem>
          )}
        />
        <Button className='bg-primary-500' type='submit'>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfileForm;
