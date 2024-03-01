'use client'
import KeyButton from '@/entities/key/components/KeyButton'
import SoundHandler from '@/lib/core/soundHandler'
import { KeySize, KeyboardWithKeysAndDesign } from '@/types'
import React, { useCallback, useEffect, useState } from 'react'

export default function Keyboard({ keyboard, enableKeyDown = true, keySize = KeySize.xl }: { keyboard: KeyboardWithKeysAndDesign, enableKeyDown?: boolean, keySize?: KeySize }) {

    const [soundHandlers, setSoundHandlers] = useState<{ [key: string]: SoundHandler }>()

    const stopAll = useCallback(() => {

        if (!soundHandlers) return

        keyboard.keys.forEach(key => {
            const soundHandler = soundHandlers[key.key.toLowerCase()]
            if (soundHandler) {

                soundHandler.pause()
            }
        })


    }, [keyboard.keys, soundHandlers])

    useEffect(() => {
        console.log('KEYBOARD:', keyboard)
        const _soundHandlers = keyboard.keys.reduce<{ [key: string]: SoundHandler }>((acc, curr) => {
            const { key, sound } = curr;
            acc[key.toLowerCase()] = new SoundHandler(curr);
            return acc;
        }, {});
        console.log(_soundHandlers)
        setSoundHandlers(_soundHandlers)

    }, [keyboard])


    useEffect(() => {

        if (!soundHandlers) return
        if (!enableKeyDown) return
        const eventOnKeyDown = (e: globalThis.KeyboardEvent) => {
            const soundHandler = soundHandlers[e.key.toLowerCase()]
            if (!soundHandler || !soundHandler.canplay) return

            soundHandler.keyDown()


        };
        const eventOnKeyUp = (e: globalThis.KeyboardEvent) => {
            const soundHandler = soundHandlers[e.key.toLowerCase()]
            if (!soundHandler) return
            if (!soundHandler || !soundHandler.canplay) return
            soundHandler.keyUp()

        }

        document.addEventListener('keydown', eventOnKeyDown)
        document.addEventListener('keyup', eventOnKeyUp)
        return () => {

            document.removeEventListener('keydown', eventOnKeyDown)
            document.removeEventListener('keyup', eventOnKeyUp)
            stopAll()

        }
    }, [soundHandlers, enableKeyDown])
    return (

        <>
            <link rel="stylesheet" type="text/css" href={keyboard.design.designUrl} />
            < div className={`flex flex-col items-start gap-1 keyboard-design-${keyboard.design.name}`} >
                <p className=' keyboard-title'>{keyboard.name}</p>
                <div className='keyboard flex gap-3 flex-wrap  justify-center flex-grow py-6 px-2 m-auto max-w-3xl' id='keyboard'>
                    {keyboard.keys.map(key => {
                        return (

                            <KeyButton soundHandler={soundHandlers ? soundHandlers[key.key] : undefined} size={keySize} key={key.id} _key={key} />
                        )
                    })}

                </div>

            </div >
        </>
    )
}
