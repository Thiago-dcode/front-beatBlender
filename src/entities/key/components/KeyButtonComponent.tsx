'use client'
import { Button } from '@/components/ui/button'
import { key, KeySize } from '@/types'
import SoundHandler from '@/lib/core/soundHandler'
import Effects from '@/entities/effect/components/effects'
import useResponsive from '@/lib/hooks/useResponsive'
import KeyWrapper from './keyWrapper'
import useIsSoundReady from '../hooks/useIsSoundReady'
import { cn } from '@/lib/utils'
import KeyButton from './keyButton'
type Props = { _key: key, size?: KeySize | number, soundHandler: SoundHandler | undefined, enableKeyDown: boolean, className?: string }
export default function KeyButtonComponent({ _key, size = KeySize.xl, soundHandler, enableKeyDown, className = '' }: Props) {
    const { isPhone, isDesktop, isTablet } = useResponsive()
    const ready = useIsSoundReady(soundHandler)

    return (<>

        <KeyWrapper className={cn(className)} bgColor={_key.bgColor} size={isPhone && size !== KeySize.sm ? size / 1.2 : size} id={_key.key}>
            {ready && soundHandler &&

                <KeyButton enableKeyDown={enableKeyDown} size={size} keyEntity={_key} onClick={() => {
                    soundHandler.keyDown()
                    soundHandler.keyUp()
                }} />

            }
        </KeyWrapper>

    </>

    )

}
