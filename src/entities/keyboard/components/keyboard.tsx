'use client'
import KeyButton from '@/entities/key/components/KeyButton'
import { KeySize, KeyboardWithKeysAndDesign } from '@/types'
import '../style.css'
import useSetSoundHandlers from '../hooks/useSetSoundHandlers'
import useResponsive from '@/lib/hooks/useResponsive'
import KeyboardKeyWrapper from './keyboardKeyWrapper'
import MetaLink from '@/components/metaLink'
import KeyboardWrapper from './keyboardWrapper'
import { useEffect } from 'react'
import ContextMenuComponent from '@/components/ui/contextMenuComponent'
import EditKeyForm from '@/entities/key/components/editKeyForm'

type Props = { keyboard: KeyboardWithKeysAndDesign, enableKeyDown?: boolean, keySize?: KeySize, displayName?: boolean, enableEdit?: boolean }
export default function Keyboard({ keyboard, enableKeyDown = true, keySize = KeySize.xl, displayName = true, enableEdit = false }: Props) {

    const { isPhone } = useResponsive()
    const { soundHandlers, setKeys, keys } = useSetSoundHandlers(undefined, enableKeyDown)
    useEffect(() => {
        setKeys(keyboard.keys)
    }, [keyboard, setKeys])
    return (

        <>


            < KeyboardWrapper showToolTip= {enableEdit} design={keyboard.design} >
                {displayName && !isPhone && <div className='keyboard-title px-5 text-white flex items-center w-full justify-between'>
                    <p title='name' className='keyboard-title'>{keyboard.name}</p>
                    <p title='description' className='keyboard-description text-xs'>{keyboard.description}</p>
                </div>}

                <KeyboardKeyWrapper>




                    {keys && soundHandlers && keys.map(key => {


                        if (enableEdit) {
                            return (

                                <ContextMenuComponent key={key.id} trigger={<KeyButton enableKeyDown={enableKeyDown} soundHandler={soundHandlers ? soundHandlers[key.key] : undefined} size={keySize} key={key.id} _key={key} />}>

                                    <EditKeyForm keyEntity={{ ...key, soundHandler: soundHandlers[key.key] }} />

                                </ContextMenuComponent>


                            )

                        }
                        return <KeyButton enableKeyDown={enableKeyDown} soundHandler={soundHandlers ? soundHandlers[key.key] : undefined} size={keySize} key={key.id} _key={key} />



                    })}

                </KeyboardKeyWrapper>

            </KeyboardWrapper >
        </>
    )
}
