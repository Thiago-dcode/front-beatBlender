'use client'

import { Button } from '@/components/ui/button'
import { key, KeySize } from '@/types'
import React, { useEffect, useState } from 'react'
import '@/entities/key/style.css'
import SoundHandler from '@/lib/core/soundHandler'
import { Key } from 'lucide-react'
import Effects from '@/entities/effect/components/effects'



export default function KeyButton({ _key, size = KeySize.xl, soundHandler }: { _key: key, size?: KeySize, soundHandler: SoundHandler | undefined }) {

    const [ready, setReady] = useState(false)
    useEffect(() => {

        if (!soundHandler) return
        const initKey = async () => {
            try {
                await soundHandler.init()
                setReady(true)
            } catch (error) {
                console.log('KEY ERROR: ' + _key.displayName, error)
                setReady(false)
            }
        }
        initKey()

    }, [soundHandler])


    return (<>
        <div style={
            {
                background: _key.bgColor || '',
                width: `${size}rem`,
                height: `${size}rem`
            }
        } className={` relative button-key-div flex flex-col justify-center `} id={`div-${_key.key}`}>
            {ready && soundHandler &&
                <>
                    <Effects effects={_key.effects} />
                    <Button style={{
                        color: _key.keyColor || '',
                    }} variant={'disable'} id={`key-${_key.key}`} className='key-button' onClick={() => {
                        soundHandler.keyDown()
                        soundHandler.keyUp()
                    }} key={_key.id}>


                        {_key.displayName.toUpperCase()}


                    </Button>
                </>
            }
        </div>

    </>

    )

}
