"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Overlay from './Overlay';

import { formatDistanceToNow } from "date-fns"
import { useAuth } from '@clerk/nextjs';
import Footer from './Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Actions } from '@/components/Actions';
import { MoreHorizontal } from 'lucide-react';
import { useApiMutation } from '@/hooks/use-apii-mutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

interface BoardCardProps {
    id: string;
    title: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    orgId: string;
    isFavorite: boolean;

}

export const BoardCard = ({
    id,
    title,
    imageUrl,
    authorId,
    authorName,
    createdAt,
    orgId,
    isFavorite,
}: BoardCardProps) => {
    const { userId } = useAuth();
    const authorLabel = userId === authorId ? "You" : authorName;
    const createdAtLabel = "" //formatDistanceToNow(createdAt, {addSuffix: true})

    const { 
        mutate: onFavorite, 
        pending: pendingFavorite 
    } = useApiMutation(api.board.favorite);
    const { 
        mutate: onUnfavorite, 
        pending: pendingUnfavorite 
    } = useApiMutation(api.board.unfavorite);

    const toggleFavorite = () => {
        if (isFavorite) {
            onUnfavorite({ id })
            .catch(() => toast.error("Failed to unfavorite"));
        }else {
            onFavorite({ id, orgId })
            .catch(() => toast.error("Failed to favorite"))
        }
    }

  return (
    <Link href={`/board/${id}`}>
        <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
            <div className='relative flex-1 bg-amber-50'>
                <Image 
                    src={imageUrl}
                    alt='Doodle'
                    fill
                    className='object-fill'
                />
                <Overlay />
                <Actions 
                    id={id}
                    title={title}
                    side='right'

                >
                    <button className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none'>
                        <MoreHorizontal 
                          className='text-white opacity-75 hover:opacity-100 transition-opacity'
                        />
                    </button>
                </Actions>
            </div>
            <Footer
                isFavorite={isFavorite}
                title={title}
                authorLabel={authorLabel}
                createdAt={createdAtLabel}
                onClick={toggleFavorite}
                disabled={pendingFavorite || pendingUnfavorite}
            />
        </div>
    </Link>
  )
}

export const BoardCardSkeleton = () => {
    return (
        <div className='aspect-[100/127] border rounded-lg overflow-hidden'>
            <Skeleton className='w-full h-full'/>
        </div>
    )
}
