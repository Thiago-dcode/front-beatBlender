'use client'

import React, { useEffect, useState } from 'react'
import { useGetSounds } from '../hooks/useGetSounds'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import { useGetSoundFolder } from '../hooks/useGetSoundFolder'
import { SoundFolderWithSounds } from '@/types'
import { Loading } from '@/components/ui/loading'
function DisplaySounds({ enable }: { enable: boolean }) {
    const [id, setId] = useState<number>()
    const [soundFoldersWithSounds, setSoundFoldersWithSounds] = useState<{
        [key: number]: SoundFolderWithSounds
    }>()
    const [_enable, setEnable] = useState<boolean>(false)
    const { data: soundFolders, isLoading:isLoadingSoundFolders } = useGetSounds({ enable })
    const { data: SoundFolderWithSounds } = useGetSoundFolder({
        enable: _enable,
        id,
        stale: 60 * 60 * 24
    })

    useEffect(() => {
        if (soundFolders) {
            setId(soundFolders[0].id)
            setEnable(true)
        }
    }, [soundFolders])

    useEffect(() => {

        if (!SoundFolderWithSounds) return
        setEnable(false)
        setSoundFoldersWithSounds((prev) => {
            if (!prev) {
                return {
                    [SoundFolderWithSounds.id]: SoundFolderWithSounds
                }
            }
            const value = !prev[SoundFolderWithSounds.id as keyof typeof soundFoldersWithSounds]
            if (!value) {
                prev[SoundFolderWithSounds.id] = SoundFolderWithSounds
            }

        })

    }, [SoundFolderWithSounds])
    return (
        <Accordion onValueChange={(e) => {
            console.log('SOUND FOLDER ID', e)
            if (!e) return
            const id = parseInt(e)
            if (soundFoldersWithSounds && soundFoldersWithSounds[id]) return
            setId(id)
            setEnable(true)


        }} type="single" collapsible className="w-full flex items-center justify-center">

            {soundFolders && soundFolders.map(soundFolder => {


                return <>
                    <AccordionItem className='capitalize w-full' value={soundFolder.id.toString()}>
                        <AccordionTrigger onClick={() => {
                            console.log('fetching sound folder')
                        }}>{soundFolder.name}</AccordionTrigger>
                        <AccordionContent>
                            {soundFoldersWithSounds && soundFoldersWithSounds[soundFolder.id] && soundFoldersWithSounds[soundFolder.id].sounds.map(sound => {

                                return <div key={sound.id}>
                                    <p>{sound.name}</p>
                                </div>
                            })}
                        </AccordionContent>
                    </AccordionItem>
                </>
            })}
            {isLoadingSoundFolders && <Loading/>}

        </Accordion>
    )
}

export default DisplaySounds