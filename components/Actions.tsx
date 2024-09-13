"use client"
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Link2, Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useApiMutation } from '@/hooks/use-apii-mutation';
import { api } from '@/convex/_generated/api';
import ConfirmModal from './ConfirmModal';
import { Button } from './ui/button';
import { useRenameModal } from '@/store/user-rename-modal';

interface ActonsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"],
    sideOffset?: DropdownMenuContentProps["sideOffset"],
    id: string;
    title: string;
}

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
}: ActonsProps) => {
    const { onOpen } = useRenameModal();
    const { mutate, pending } = useApiMutation(api.board.remove);
    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`,
        )
        .then(() => toast.success("Link copied"))
        .catch(() => toast.error("Failed to copy link"));
    }
    const onDelet = () => {
        mutate({id})
        .then(() => toast.success("Board deleted"))
        .catch(() => toast.error("Failed to delete board"));

    }

  return (
    <div className='absolute z-50 top-1 right-1'>
        <DropdownMenu>
            <DropdownMenuTrigger>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side={side}
                sideOffset={sideOffset}
                onClick={(e) => e.stopPropagation()}
                className='w-60'
            >
                <DropdownMenuItem onClick={onCopyLink} className='p-3 cursor-pointer'>
                    <Link2 className='h-4 w-4 mr-2'/>
                    Copy board link
                </DropdownMenuItem>
                <ConfirmModal 
                    header='Delete board?' 
                    description='This is will delete the board and all of its contents'
                    onConfirm={onDelet}
                    disabled={pending}
                >
                    <Button 
                      variant={'ghost'} 
                      disabled={pending} 
                      className='p-3 cursor-pointer text-sm w-full justify-start font-normal'
                    >
                        <Trash className='h-4 w-4 mr-2'/>
                        Delete
                    </Button>
                </ConfirmModal>

                <DropdownMenuItem onClick={() => onOpen(id, title)} className='p-3 cursor-pointer'>
                    <Pencil className='h-4 w-4 mr-2'/>
                    Rename
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
