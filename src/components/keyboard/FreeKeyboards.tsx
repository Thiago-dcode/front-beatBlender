'use client'

import { Keyboard as KeyboardType, KeyboardWithKeys } from '@/types'
import React, { useEffect, useState } from 'react'
import Keyboard from './Keyboard'

export default function FreeKeyboards({ keyboards }: { keyboards: KeyboardType[] }) {
    const [keyboard, setKeyboard] = useState<KeyboardWithKeys>()
    const [isPending, setIsPending] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {

        const getFreeKeyboard = async (id: number) => {
            try {
                setIsPending(true)
                const res = await fetch(`http://localhost:8000/free/keyboards/${id}`)
                if (!res.ok) {
                    throw new Error('Free keyboard not found')
                }
                const data: {
                    keyboard: KeyboardWithKeys
                } = await res.json()

                setKeyboard(data.keyboard)
            } catch (error) {

                setError(error instanceof Error ? error.message : "Some error ocurr during fetching free keyboard")
            } finally {
                setIsPending(false)
            }

        }
        getFreeKeyboard(keyboards[0].id)

    }, [keyboards])

    return (
        <div className="border-2 border-black">

            <div className="flex ">
                <div>
                    {keyboard && !isPending && <Keyboard keyboard={keyboard} />}
                    {isPending && !error && <p>Loading...</p>}
                </div>

                <div>
                    {keyboards?.map(keyboard => {

                        return (
                            <div key={keyboard.id}>
                                <p className="text-blue-600">{keyboard.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>


        </div>
    )
}
