'use client'
import { KeySize, Keyboard as KeyboardType, KeyboardWithKeysAndDesign } from '@/types'
import React, { useEffect, useState } from 'react'
import Keyboard from '@/entities/keyboard/components/keyboard'
import { CustomError } from '@/lib/exceptions/exceptions'
import { useGetFreeKeyboard } from '../hooks/useGetFreeKeyboard'
import { Button } from '@/components/ui/button'

export default function FreeKeyboards({ keyboards, keyboard }: { keyboards: KeyboardType[], keyboard: KeyboardWithKeysAndDesign }) {

    const [keyboardName, setKeyboardName] = useState<string>(keyboard.name)
    const [enable, setEnable] = useState<boolean>(false)
    const [keyboardsMemo, setKeyboardsMemo] = useState<{ [key: string]: KeyboardWithKeysAndDesign }>(() => {


        return {
            [keyboard.name]: keyboard
        }
    })
    const [stale, setStale] = useState(1000 * 60 * 5)
    const { data: _keyboard, isPending, error, refetch } = useGetFreeKeyboard({
        name: keyboardName,
        enable: enable,
        initialData: keyboard,
        stale
    })

    useEffect(() => {
        setEnable(false)
    }, [])
    useEffect(() => {
        if (keyboardsMemo[keyboardName] || !enable) return
        refetch()
    }, [keyboardName])

    useEffect(() => {
        if (!_keyboard) return
        setKeyboardsMemo(prev => {

            prev[_keyboard.name] = _keyboard
            return prev
        })

    }, [_keyboard])
    if (error) {
        if (error instanceof CustomError) {

            throw new CustomError(error.message, error.errors, error.statusCode)
        }

    }

    return (
        <div className=" flex flex-col items-end gap-2">

            <div className="flex ">
                <div>
                    {_keyboard && !isPending && <Keyboard enableEdit={true} keySize={KeySize.xl} enableKeyDown={true} keyboard={_keyboard} />}
                    {isPending && <p>Loading...</p>}
                </div>

            </div>


            <div className='flex gap-2  items-center justify-start'>
                {keyboards?.map(kboard => {

                    return (
                        <Button style={
                            {
                                background: kboard.id === _keyboard?.id ? 'black' : 'gray'
                            }
                        } className=' text-xs px-2 py-1' size={"disable"} key={kboard.id} onClick={() => {
                          setEnable(true)
                            setKeyboardName(kboard.name)

                        }} > {kboard.name}</Button>
                    )
                })}
            </div>

        </div>
    )
}
