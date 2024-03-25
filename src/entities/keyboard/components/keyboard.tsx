'use client'
import KeyButton from '@/entities/key/components/KeyButton'
import { KeySize, KeyboardWithKeysAndDesign } from '@/types'
import '../style.css'
import useSetSoundHandlers from '../hooks/useSetSoundHandlers'
import useResponsive from '@/lib/hooks/useResponsive'
import KeyboardKeyWrapper from './keyboardKeyWrapper'
import MetaLink from '@/components/metaLink'
import KeyboardWrapper from './keyboardWrapper'
export default function Keyboard({ keyboard, enableKeyDown = true, keySize = KeySize.xl, displayName = true }: { keyboard: KeyboardWithKeysAndDesign, enableKeyDown?: boolean, keySize?: KeySize, displayName?: boolean }) {
    const { isPhone } = useResponsive()
    const {soundHandlers} = useSetSoundHandlers(keyboard.keys, enableKeyDown)
    return (

        <>
            <MetaLink href={keyboard.design.designUrl} />


            < KeyboardWrapper design={keyboard.design} >
                {displayName && !isPhone && <div className='keyboard-title px-5 text-white flex items-center w-full justify-between'>
                    <p title='name' className='keyboard-title'>{keyboard.name}</p>
                    <p title='description' className='keyboard-description text-xs'>{keyboard.description}</p>
                </div>}

                <KeyboardKeyWrapper>




                    {keyboard.keys.map(key => {
                        return (

                            <KeyButton enableKeyDown={enableKeyDown} soundHandler={soundHandlers ? soundHandlers[key.key] : undefined} size={keySize} key={key.id} _key={key} />
                        )
                    })}

                </KeyboardKeyWrapper>

            </KeyboardWrapper >
        </>
    )
}
