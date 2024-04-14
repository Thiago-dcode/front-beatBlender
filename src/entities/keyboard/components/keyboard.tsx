'use client'
import KeyButton from '@/entities/key/components/KeyButtonComponent'
import { KeySize, KeyboardWithKeysAndDesign } from '@/types'
import '../style.css'
import useSetSoundHandlers from '../hooks/useSetSoundHandlers'
import useResponsive from '@/lib/hooks/useResponsive'
import KeyboardKeyWrapper from './keyboardKeyWrapper'
import MetaLink from '@/components/metaLink'
import KeyboardWrapper from './keyboardWrapper'
import { useEffect, useState } from 'react'
import ContextMenuComponent from '@/components/ui/contextMenuComponent'
import EditKeyForm from '@/entities/key/components/editKeyForm'
import KeyButtonComponent from '@/entities/key/components/KeyButtonComponent'

type Props = { keyboard: KeyboardWithKeysAndDesign, enableKeyDown?: boolean, keySize?: KeySize, displayName?: boolean, enableEdit?: boolean }
export default function Keyboard({ keyboard, enableKeyDown = true, keySize = KeySize.xl, displayName = true, enableEdit = false }: Props) {

    const { isPhone } = useResponsive()
    const [editOpen, setEditOpen] = useState<{ [key: string]: boolean }>(() => {
        return keyboard.keys.reduce((acc: { [key: string]: boolean }, key) => {

            acc[key.id.toString()] = false
            return acc
        }, {});
    })
    const { soundHandlers, setKeys, keys, setEnableKeyDown, enableKeyDown: enableKeyDownSoundHandler } = useSetSoundHandlers(undefined, enableKeyDown)
    useEffect(() => {
        setKeys(keyboard.keys)

    }, [keyboard, setKeys])

    useEffect(() => {
        console.log(enableKeyDown)
    }, [keyboard])


    // useEffect(() => {

    //     const booleanValues = Object.values(editOpen)

    //     let hasOneOpen = false
    //     for (let i = 0; i < booleanValues.length; i++) {

    //         const element = booleanValues[i];
    //         if (element) {
    //             console.log('HASONEOPEN')
    //             hasOneOpen = true
    //             break;
    //         }
    //         hasOneOpen = false

    //     }
    //     setEnableKeyDown(!hasOneOpen)

    // }, [editOpen])
    return (

        <>


            < KeyboardWrapper design={keyboard.design} >
                {displayName && !isPhone && <div className='keyboard-title px-5 text-white flex items-center w-full justify-between'>
                    <p title='name' className='keyboard-title'>{keyboard.name}</p>
                    <p title='description' className='keyboard-description text-xs'>{keyboard.description}</p>
                </div>}

                <KeyboardKeyWrapper showToolTip={enableEdit}>




                    {keys && soundHandlers && keys.map(key => {


                        if (enableEdit) {
                            return (

                                <ContextMenuComponent onOpenChange={(e) => {

                                    setEnableKeyDown(!e)





                                }} key={key.id} trigger={<KeyButtonComponent enableKeyDown={enableKeyDown} soundHandler={soundHandlers ? soundHandlers[key.key] : undefined} size={keySize} key={key.id} _key={key} />}>

                                    <EditKeyForm order={key.order} design={keyboard.design} keyEntity={key} />

                                </ContextMenuComponent>


                            )

                        }
                        return <KeyButtonComponent enableKeyDown={enableKeyDown} soundHandler={soundHandlers ? soundHandlers[key.key] : undefined} size={keySize} key={key.id} _key={key} />



                    })}

                </KeyboardKeyWrapper>

            </KeyboardWrapper >
        </>
    )
}
