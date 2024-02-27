'use client'
import KeyButton from '@/entities/key/components/KeyButton'
import SoundHandler from '@/lib/core/soundHandler'
import { KeySize, KeyboardWithKeysAndDesign } from '@/types'
import React, { useCallback, useEffect, useState } from 'react'

export default function Keyboard({ keyboard, enableKeyDown = true, keySize = KeySize.xl }: { keyboard: KeyboardWithKeysAndDesign, enableKeyDown?: boolean, keySize?: KeySize }) {

    const [soundHandlers, setSoundHandlers] = useState<{ [key: string]: SoundHandler }>()

    const pauseAllAudios = useCallback(() => {
        let paused = false
        if (!soundHandlers || paused) return;

        keyboard.keys.forEach(key => {
            soundHandlers[key.key].pause();
        });
        paused = true

    }, [soundHandlers, keyboard]);

    useEffect(() => {

        const _soundHandlers = keyboard.keys.reduce<{ [key: string]: SoundHandler }>((acc, curr) => {
            const { key, sound } = curr;
            acc[key] = new SoundHandler(sound.soundUrl);
            return acc;
        }, {});

        setSoundHandlers(_soundHandlers)

    }, [keyboard])


    useEffect(() => {

        if (!soundHandlers) return
        let eventIsRunning = false
        if (!enableKeyDown || eventIsRunning) return
        const eventOnKeyDown = (e: globalThis.KeyboardEvent) => {
            if (!soundHandlers[e.key]) return
            eventIsRunning = true
            const key = e.key
            const div = document.getElementById(`div-${key}`);
            soundHandlers[e.key].keyDown()
            div?.classList.add("button-key-clicked");

        };
        const eventOnKeyUp = (e: globalThis.KeyboardEvent) => {
            const key = e.key
            if (!soundHandlers[key]) return
            const div = document.getElementById(`div-${key}`);

            div?.classList.remove("button-key-clicked");

            soundHandlers[key].keyUp()

        }

        document.addEventListener('keydown', eventOnKeyDown)
        document.addEventListener('keyup', eventOnKeyUp)
        return () => {
            pauseAllAudios()
            document.removeEventListener('keydown', eventOnKeyDown)
            document.removeEventListener('keyup', eventOnKeyUp)

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
