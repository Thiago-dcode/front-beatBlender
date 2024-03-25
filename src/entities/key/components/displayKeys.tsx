'use client'

import React, { useEffect } from 'react'
import { useGetKeys } from '../hooks/useGetKeys'
import KeyboardKeyWrapper from '@/entities/keyboard/components/keyboardKeyWrapper'
import KeyButton from './KeyButton'
import { KeySize } from '@/types'
import { PlusSquareIcon, WrenchIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useSetSoundHandlers from '@/entities/keyboard/hooks/useSetSoundHandlers'
import { Button } from '@/components/ui/button'
type Props = {
    enable?: boolean
}
function DisplayKeys({ enable = false }: Props) {
    const { data, error, isPending } = useGetKeys({ enable });
    const { soundHandlers, setKeys } = useSetSoundHandlers(undefined, false)
    useEffect(() => {
        console.log('data,error,isPending', data, error, isPending)
        if (data) {
            setKeys(data)
        }
    }, [data, error, isPending, setKeys])
    return (
        <>
            <KeyboardKeyWrapper className='bg-transparent gap-1'>

                {data && soundHandlers && data.map(key => {

                    return (
                        <div key={key.key} className='border border-black p-1' >
                            <div className=' py-1 w-full flex text-xs items-center justify-evenly '>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size={'icon'} variant="ghost"> <WrenchIcon /></Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit profile</DialogTitle>
                                            <DialogDescription>
                                                Make changes to your profile here. Click save when you&apos;re done.
                                            </DialogDescription>
                                        </DialogHeader>
                                  
                                        <DialogFooter>
                                            <Button type="submit">Save changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Button size={'icon'} variant={'default'}>   <PlusSquareIcon /></Button>
                             
                            </div>
                            <KeyButton className='!shadow-none bg-app-background text-white' size={KeySize.sm} enableKeyDown={true} _key={key} soundHandler={soundHandlers[key.key]} />
                        </div>
                    )
                })}


            </KeyboardKeyWrapper>

        </>
    )
}

export default DisplayKeys