'use client'
import { KeySize, Keyboard as KeyboardType, KeyboardWithKeysAndDesign } from '@/types'
import React, { useEffect, useState } from 'react'
import Keyboard from '@/entities/keyboard/components/keyboard'
import { CustomError } from '@/lib/exceptions/exceptions'
import { useGetFreeKeyboard } from '../hooks/useGetFreeKeyboard'
import { Button } from '@/components/ui/button'

export default function FreeKeyboards({ keyboards, keyboard }: { keyboards: KeyboardType[], keyboard: KeyboardWithKeysAndDesign }) {

    const [keyboardName, setKeyboardName] = useState<string>(keyboard?.name)
    const [enable, setEnable] = useState<boolean>(false)
    const [stale, setStale] = useState(1000 * 60 * 5)
    const { data, isPending, error } = useGetFreeKeyboard({
        name: keyboardName,
        enable,
        initialData: keyboard ? { keyboard } : undefined,
        stale
    })

    useEffect(() => {
        setEnable(false)
    }, [])
    if (error) {
        if (error instanceof CustomError) {

            throw new CustomError(error.message, error.errors, error.statusCode)
        }

    }

    return (
        <div className=" flex flex-col items-end gap-2">

            <div className="flex ">
                <div>
                    {data?.keyboard && <Keyboard keySize={KeySize.xl} enableKeyDown={true} keyboard={data.keyboard} />}
                    {isPending && <p>Loading...</p>}
                </div>

            </div>


            <div className='flex gap-2  items-center justify-start'>
                {keyboards?.map(_keyboard => {

                    return (
                        <Button style={
                            {
                                background: _keyboard.id === data?.keyboard?.id ? 'black' : 'gray'
                            }
                        } className=' text-xs px-2 py-1' size={"disable"} key={_keyboard.id} onClick={() => {
                            setKeyboardName(_keyboard.name)
                            setEnable(true)

                        }} > {_keyboard.name}</Button>
                    )
                })}
            </div>

        </div>
    )
}
