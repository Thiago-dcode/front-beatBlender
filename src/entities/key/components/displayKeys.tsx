'use client'

import React, { useEffect, useState } from 'react'
import { useGetKeys } from '../hooks/useGetKeys'
import KeyboardKeyWrapper from '@/entities/keyboard/components/keyboardKeyWrapper'
import KeyButton from './KeyButton'

import { TooltipComponent } from '@/components/ui/toolTipComponent'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { key, keyWithSoundHandler } from '@/types'

import useSetSoundHandlers from '@/entities/keyboard/hooks/useSetSoundHandlers'
import { Button } from '@/components/ui/button'
type Props = {
    enable?: boolean,
    keysSelected: keyWithSoundHandler[] | undefined,
    handleAddKeys: (key: keyWithSoundHandler) => void
}
type keysByCategory = { [category: string]: key[] }
function DisplayKeys({ enable = false, keysSelected, handleAddKeys }: Props) {
    const { data, error, isPending } = useGetKeys({ enable });
    const { soundHandlers, setKeys, keys } = useSetSoundHandlers(undefined, false)
    const [keysByCategory, setKeysByCategory] = useState<keysByCategory>()
    useEffect(() => {

        if (data) {
            setKeys(data)

        }
    }, [data, error, isPending, setKeys])

    useEffect(() => {
        if (!keys) return
        console.log(keys)
        const _keysByCategory: keysByCategory = keys.reduce((acc: keysByCategory, curr, i) => {
            const category = curr.category.name;
            if (acc[category]) {
                acc[category].push(curr);
            } else {
                acc[category] = [curr];
            }
            return acc;

        }, {

        })
        setKeysByCategory(_keysByCategory)
    }, [keys])



    return (
       
            <div className='flex flex-col items-center justify-center mb-4'>
              



                {keysByCategory && soundHandlers && Object.entries(keysByCategory).map(([category, keys]) => {

                    return (

                        <div className='flex flex-col w-full items-start justify-center px-4 ' key={category}>
                            <h3 className='  w-full border-b  border-b-black/80'>{category}</h3>
                            <Carousel
                                opts={{
                                    align: "start",


                                }} className="w-full ">

                                <CarouselContent className="px-4 py-2">

                                    {keys.filter((key) => {
                                        if (!keysSelected) return true
                                        return !keysSelected.some((_key) => {

                                            return _key.id === key.id
                                        })

                                    }).map((key) => {


                                        return (
                                            <>
                                                <div className=''>
                                                    <CarouselItem key={key.key} className="  ">
                                                        <div className='b flex flex-col items-center justify-center gap-1 border border-white px-2 py-1'>


                                                            <h4 className='text-xs w-full text-center overflow-auto text-nowrap'>{key.name}</h4>
                                                            <KeyButton className='!shadow-none bg-app-background text-white' size={5} enableKeyDown={true} _key={key} soundHandler={soundHandlers[key.key]} />
                                                            <Button onClick={() => {
                                                                handleAddKeys({
                                                                    ...key, soundHandler: soundHandlers[key.key]
                                                                })




                                                            }} className=' h-6 !py-2 rounded-none w-full bg-black text-white hover:bg-black/50' >+</Button>
                                                        </div>
                                                    </CarouselItem>
                                                </div>

                                            </>
                                        )

                                    })}

                                </CarouselContent>

                                <CarouselPrevious className='ml-3' />
                                <CarouselNext className=' mr-3' />
                            </Carousel>

                        </div>


                    )
                })}



            </div>


    )
}

export default DisplayKeys