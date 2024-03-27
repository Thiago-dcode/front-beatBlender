'use client'
import { Button } from '@/components/ui/button'
import { key, KeySize } from '@/types'
import SoundHandler from '@/lib/core/soundHandler'
import Effects from '@/entities/effect/components/effects'
import useResponsive from '@/lib/hooks/useResponsive'
import KeyWrapper from './keyWrapper'
import useIsSoundReady from '../hooks/useIsSoundReady'
import { cn } from '@/lib/utils'
type Props = { _key: key, size?: KeySize | number, soundHandler: SoundHandler | undefined, enableKeyDown: boolean, className?: string }
export default function KeyButton({ _key, size = KeySize.xl, soundHandler, enableKeyDown, className = '' }: Props) {
    const { isPhone, isDesktop, isTablet } = useResponsive()
    const ready = useIsSoundReady(soundHandler)
    return (<>

        <KeyWrapper className={cn(className)} bgColor={_key.bgColor} size={isPhone && size !== KeySize.sm ? size / 1.2 : size} id={_key.key}>
            {ready && soundHandler &&
                <>
                    {size >= KeySize.md && <Effects effects={_key.effects} />}
                    <Button style={{
                        color: _key.keyColor || '',
                    }} variant={'disable'} id={`key-${_key.key}`} className='key-button'  onClick={() => {
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
        </KeyWrapper>

    </>

    )

}
