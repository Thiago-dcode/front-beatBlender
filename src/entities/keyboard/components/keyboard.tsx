'use client'
import KeyButton from '@/entities/key/components/KeyButton'
import { KeySize, KeyboardWithKeysAndDesign } from '@/types'
import React, { useEffect } from 'react'

export default function Keyboard({ keyboard, enableKeyDown = true, keySize = KeySize.xl }: { keyboard: KeyboardWithKeysAndDesign, enableKeyDown?: boolean, keySize?: KeySize }) {

    useEffect(() => {
        let eventIsRunning = false
        if (!enableKeyDown || eventIsRunning) return
        const eventOnKeyDown = (e: globalThis.KeyboardEvent) => {

            for (let i = 0; i < keyboard.keys.length; i++) {
                eventIsRunning = true
                const { key } = keyboard.keys[i];
                if (e.key.toLowerCase() != key.toLowerCase()) continue
                const button = document.getElementById(`key-${key}`);
                const div = document.getElementById(`div-${key}`);
                if (e.key === key) {
                    button?.click();
                    div?.classList.add("button-key-clicked");
                }
                setTimeout(() => {
                    div?.classList.remove("button-key-clicked");
                }, 200);

            }
        };


        document.addEventListener('keydown', eventOnKeyDown)

        return () => {
            document.removeEventListener('keydown', eventOnKeyDown)
        }
    }, [keyboard, enableKeyDown])
    return (

        <>
            <link rel="stylesheet" type="text/css" href={keyboard.design.designUrl} />
            < div className={`flex flex-col items-start gap-1 keyboard-design-${keyboard.design.name}`} >
                <p className=' keyboard-title'>{keyboard.name}</p>
                <div className='keyboard flex gap-3 flex-wrap  justify-center flex-grow py-6 px-2 m-auto max-w-3xl' id='keyboard'>
                    {keyboard.keys.map(key => {
                        return (

                            <KeyButton size={keySize} key={key.id} _key={key} />
                        )
                    })}

                </div>

            </div >
        </>
    )
}
