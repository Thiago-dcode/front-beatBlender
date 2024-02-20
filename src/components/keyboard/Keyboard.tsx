import { KeyboardWithKeys } from '@/types'
import React from 'react'

export default function Keyboard({ keyboard }: { keyboard: KeyboardWithKeys }) {
    return (
        < div >

            <p>{keyboard.name}</p>

        </div >
    )
}
