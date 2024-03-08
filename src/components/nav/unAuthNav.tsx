'use client'
import Link from 'next/link'
import { Button } from '../ui/button'
import useResponsive from '@/lib/hooks/useResponsive'
import { Menu } from 'lucide-react';
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
function UnAuthNav() {
    const { isPhone } = useResponsive()
    return (
        <nav>

            {!isPhone && <ul className='flex items-center justify-center gap-4 text-sm'>
                <li>
                    <Link className='hover:text-app-greenPastel' href={'/login'}>Sign in</Link>
                </li>
                <li>
                    <Link href={'/register'}><Button size={'xs'} variant={'green'}>Start for free!</Button></Link>
                </li>
            </ul>}
            {
                isPhone && <DropdownMenu>
                    <DropdownMenuTrigger  asChild>
                        <Menu size={40}  />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className="px-2 bg-app-background text-white">
                        <DropdownMenuGroup>
                            <DropdownMenuItem className='w-full flex items-center 
                            focus:bg-transparent'>
                                <Link className='hover:text-app-greenPastel font-bold w-full m-auto text-center' href={'/login'}>Sign in</Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='w-full flex items-center focus:bg-transparent'>
                            <Link href={'/register'}><Button size={'xs'} variant={'green'}>Start for free!</Button></Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            }


        </nav>
    )
}

export default UnAuthNav