'use client'
import { Keyboard as KeyboardType, KeyboardWithKeys } from '@/types'
import React, { useState } from 'react'
import Keyboard from '@/entities/keyboard/components/keyboard'
import { CustomError } from '@/lib/exceptions/exceptions'
import { useGetFreeKeyboard } from '../hooks/useGetFreeKeyboard'
import { Button } from '@/components/ui/button'

export default function FreeKeyboards({ keyboards, keyboard }: { keyboards: KeyboardType[], keyboard: KeyboardWithKeys | undefined }) {

    const [keyboardId, setKeyboardId] = useState<number>(keyboards[0].id)
    const { data, isPending, error } = useGetFreeKeyboard({
        id: keyboardId,
        initialData: keyboard ? { keyboard } : undefined


    })
    if (error) {
        if (error instanceof CustomError) {

            throw new CustomError(error.message, error.errors, error.statusCode)
        }
        throw new Error(error.message)
    }

    return (
        <div className="border-2 border-black">

            <div className="flex ">
                <div>
                    {data?.keyboard && <Keyboard keyboard={data.keyboard} />}
                    {isPending && <p>Loading...</p>}
                </div>

                <div>
                    {keyboards?.map(keyboard => {

                        return (
                            <Button key={keyboard.id} onClick={() => {
                                setKeyboardId(keyboard.id)
                            }} > {keyboard.name}</Button>
                        )
                    })}
                </div>
            </div>



        </div>
    )
}
