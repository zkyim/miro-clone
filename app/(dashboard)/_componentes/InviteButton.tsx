import { OrganizationProfile } from "@clerk/clerk-react"
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InviteButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'}>
                    <Plus className='h-4 w-4 mr-2'/>
                    Invite members
                </Button>
            </DialogTrigger>
            <DialogContent className='p-0 bg-transparent border-none max-w-[900px] h-[400px] overflow-y-auto '>
                <OrganizationProfile />
            </DialogContent>
        </Dialog>
    )
}