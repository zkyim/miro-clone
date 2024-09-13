"use client";

import { useRenameModal } from '@/store/user-rename-modal';
import React, { FormEventHandler, useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useApiMutation } from '@/hooks/use-apii-mutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

interface RenameModalProps {

}

const RenameModal = () => {
    const { mutate, pending } = useApiMutation(api.board.update);
    const { isOpen, onClose, initialValues } = useRenameModal();
    const [title, setTitle] = useState(initialValues.title)
    useEffect(() => {
        setTitle(initialValues.title)
    }, [initialValues.title])

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        mutate({
            id: initialValues.id,
            title,
        })
        .then(() => {
            toast.success("Board renamed");
            onClose();
        })
        .catch(() => {
            toast.error("Failed to rename baord")
        })
    }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>Edit baord title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this  board</DialogDescription>
        <form onSubmit={onSubmit} className='space-y-4'>
            <Input 
                disabled={pending}
                required
                maxLength={60}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Board Title'
            />
            <DialogFooter>
                <DialogClose asChild>
                    <Button type='button' variant={'outline'}>
                        Close
                    </Button>
                </DialogClose>
                <Button disabled={pending} type='submit'>
                    Save
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RenameModal
