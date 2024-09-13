"use client"
import { Actions } from '@/components/Actions';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { useRenameModal } from '@/store/user-rename-modal';
import { useQuery } from 'convex/react';
import { Menu } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
});

interface InfoProps {
  boardId: string;
}

const TabSeparator = () => {
  return (
    <div className='bg-neutral-300 pl-0.5 h-[50%]'/>
  )
}

export const Info = ({boardId}: InfoProps) => {
  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> })
  const { onOpen } = useRenameModal();
  if (!data) return null;
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <Hint label='Go to baord' side='bottom' sideOffset={10}>
        <Button className='px-2' variant={'board'}>
          <Link href={'/'} className='flex'>
            <Image 
              src={'/logo.svg'}
              alt='Board Logo'
              width={40}
              height={40}
            />
            <span className={cn("font-semibold text-xl text-black ml-2", font.className)}>Board</span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label='Edit title' side='bottom' sideOffset={10}>
        <Button 
          variant={'board'} 
          className='text-base px-2 font-normal'
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <div className='w-10 h-10'>
        <Actions 
          id={data._id}
          title={data.title}
          side='bottom'
          sideOffset={10}
        >
          <div>
            <Hint label='Main menu' side='bottom' sideOffset={10}>
              <Button size={'icon'} variant={'board'}>
                <Menu />
              </Button>
            </Hint>
          </div>
        </Actions>
      </div>



    </div>
  )
}

export const InfoSkeleton = () => {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]'/>
  )
}
