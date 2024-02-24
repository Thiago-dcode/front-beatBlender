'use client'

import { Button } from '@/components/ui/button'
import { key, KeySize } from '@/types'
import React, { useEffect, useState } from 'react'
import '@/entities/key/style.css'



export default function KeyButton({ _key, size = KeySize.xl }: { _key: key, size?: KeySize }) {

    const [audio, setAudio] = useState<HTMLAudioElement>()
    const [render, setRender] = useState(false)
    useEffect(() => {

        setAudio(new Audio(_key.sound.soundUrl))
    }, [_key])

    useEffect(() => {

        if (!audio || !render) return

        audio.play()

        return () => {
            if (render) audio.pause()




        }
    }, [audio, render])

    return (<>
        <div style={
            {
                width: `${size}rem`,
                height: `${size}rem`
            }
        } className={` button-key-div flex flex-col justify-center `} id={`div-${_key.key}`}>
            {audio &&
                <Button variant={'disable'} id={`key-${_key.key}`} className='key-button' onClick={() => {
                    if (!render) setRender(true)

                    setAudio(new Audio(_key.sound.soundUrl))
                }} key={_key.id}>{_key.displayName}</Button>
            }
        </div>

    </>

    )

}
