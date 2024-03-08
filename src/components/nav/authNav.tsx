import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AvatarComponent } from '../ui/avatarComponent'
import LogOut from '@/entities/auth/components/logOut'
function AuthNav({ username, avatar }: { username: string, avatar: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <AvatarComponent src={avatar} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' color='white/50' className="px-2 bg-white">
                <DropdownMenuGroup>
                    <DropdownMenuItem className='w-full flex items-center'>
                        <Link className='w-full m-auto text-center' href={`/${username}`}>Profile</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem className='w-full flex items-center'>
                    <LogOut btnClassname='w-full' classname='w-full'  />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AuthNav