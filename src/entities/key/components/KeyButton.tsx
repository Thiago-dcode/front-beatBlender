import { Button } from '@/components/ui/button'
import Effects from '@/entities/effect/components/effects'
import soundHandler from '@/lib/core/soundHandler'
import { Effect, KeySize, key } from '@/types'
import React from 'react'

type Props = {

    keyEntity: key,
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    enableKeyDown?: boolean,
    size?: number,
    displayName?: string,
    keyColor?: string



}
function KeyButton({ keyEntity, keyColor = '', onClick = () => { }, enableKeyDown = false, size = KeySize.xl, displayName = '' }: Props) {
    return (
        <>
            {size >= KeySize.md && <Effects effects={keyEntity.effects} />}
            <Button type="button" style={{
                color: keyColor || keyEntity.keyColor || '',
            }} variant={'disable'} id={`key-${keyEntity.key}`} className='key-button' onClick={(e) => {
                onClick(e)
            }} key={keyEntity.id}>


                {(keyEntity.displayName.toLowerCase() !== keyEntity.key.toLowerCase()) && enableKeyDown ? <div className='flex'>
                    {keyEntity.displayName.toUpperCase()}
                    <span className='text-[0.5rem]'>{`(${keyEntity.key})`}</span>
                </div> : displayName.toUpperCase() || keyEntity.displayName.toUpperCase()}


            </Button>
        </>
    )
}

export default KeyButton