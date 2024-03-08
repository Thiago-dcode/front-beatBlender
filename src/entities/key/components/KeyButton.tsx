'use client'

import { Button } from '@/components/ui/button'
import { key, KeySize } from '@/types'
import React, { useEffect, useState } from 'react'
import '@/entities/key/style.css'
import SoundHandler from '@/lib/core/soundHandler'
import { Key } from 'lucide-react'
import Effects from '@/entities/effect/components/effects'
import useResponsive from '@/lib/hooks/useResponsive'



export default function KeyButton({ _key, size = KeySize.xl, soundHandler, enableKeyDown }: { _key: key, size?: KeySize, soundHandler: SoundHandler | undefined, enableKeyDown: boolean }) {
    const { isPhone, isDesktop, isTablet } = useResponsive()
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
                width: `${isPhone && size !== KeySize.sm ? size / 1.2 : size}rem`,
                height: `${isPhone && size !== KeySize.sm ? size / 1.2 : size}rem`,
            }
        } className={`relative button-key-div flex flex-col justify-center `} id={`div-${_key.key}`}>
            {ready && soundHandler &&
                <>
                    {size !== KeySize.sm && <Effects effects={_key.effects} />}
                    <Button style={{
                        color: _key.keyColor || '',
                    }} variant={'disable'} id={`key-${_key.key}`} className='key-button' onClick={() => {
                        soundHandler.keyDown()
                        soundHandler.keyUp()
                    }} key={_key.id}>


                        {(_key.displayName.toLowerCase() !== _key.key.toLowerCase()) && enableKeyDown ? <div className='flex'>
                            {_key.displayName.toUpperCase()}
                            <span className='text-[0.5rem]'>{`(${_key.key})`}</span>
                        </div> : _key.displayName.toUpperCase()}


                    </Button>
                </>
            }
        </div>

    </>

    )

}
