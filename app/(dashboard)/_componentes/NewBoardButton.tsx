"use client";
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-apii-mutation';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

interface NewBoardButtonProps {
    orgId: string;
    disabled?: boolean;
}

const NewBoardButton = ({
    orgId,
    disabled
}: NewBoardButtonProps) => {
    const router = useRouter();
    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {
        mutate({
            orgId: orgId,
            title: "Untitled",
        })
        .then((id) => {
            toast.success("Board created");
            router.push(`/board/${id}`)
        })
        .catch(() => toast.error("Failed to create a board"));
    }
  return (
    <Button
        disabled={pending || disabled}
        onClick={onClick}
        className={cn("w-full h-full col-span-1 aspect-[100/127] rounded-lg bg-blue-600 hover:bg-blue-800 flex flex-col items-center justify-center py-6",
            (pending || disabled) && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
        )}
    >
        <div />
        <Plus className='h-12 w-12 text-white stroke-1'/>
        <p className='text-sm text-white font-light'>New board</p>
    </Button>
  )
}

export default NewBoardButton
