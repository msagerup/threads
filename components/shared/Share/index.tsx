"use client"

import { CopyIcon } from "@radix-ui/react-icons"
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import Image from 'next/image'


export function Share({link} : {link: string}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
      <Image
          className='cursor-pointer object-contain'
          src='/assets/share.svg'
          alt='share'
          width={24}
          height={24}
        />
      </PopoverTrigger>
      <PopoverContent align="start" side='bottom' className="w-[220px] sm:w-[400px] bg-dark-3 p-4 z-10">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold text-light-2">Share thread</h3>
          <p className="text-sm text-light-2">
            Anyone who has this link and an active account will be able to view
            this.
          </p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={link}
              readOnly
              className="h-9 text-gray-1"
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Share