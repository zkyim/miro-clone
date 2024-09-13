import React from 'react'
import { CreateOrganization } from '@clerk/clerk-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const EmptyOrg = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-semibold mt-6'>Welcome to Board</h2>
      <p className='text-muted-foreground text-sm mt-2'>Create an organization to get started</p>
      <div className='mt-6'>
        <Dialog>
            <DialogTrigger asChild>
                <Button className='' size={'lg'}>
                    <Plus className='text-white'/>
                    Create organization
                </Button>
            </DialogTrigger>
            <DialogContent className='p-0 bg-transparent border-none max-w-[480px]'>
                <CreateOrganization />
            </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default EmptyOrg
