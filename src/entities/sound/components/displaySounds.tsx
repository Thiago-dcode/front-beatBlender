'use client'

import React, { useEffect, useState } from 'react'
import { useGetSounds } from '../hooks/useGetSounds'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useGetSoundFolder } from '../hooks/useGetSoundFolder'
import { Sound, SoundFolderWithSounds } from '@/types'
import { Loading } from '@/components/ui/loading'
import { PlayCircleIcon } from 'lucide-react'
import usePlayAudio from '@/entities/key/hooks/usePlayAudio'
function DisplaySounds({ enable, setSound = () => { } }: { enable: boolean, setSound?: (sound: Sound) => void }) {
    const playAudio = usePlayAudio()
    const [id, setId] = useState<number>()
    const [soundFoldersWithSounds, setSoundFoldersWithSounds] = useState<{
        [key: number]: SoundFolderWithSounds
    }>()

    const [_enable, setEnable] = useState<boolean>(false)
    const { data: soundFolders, isLoading: isLoadingSoundFolders } = useGetSounds({ enable })
    const { data: SoundFolderWithSounds, isLoading } = useGetSoundFolder({
        enable: _enable,
        id,
        stale: 60 * 60 * 24
    })

    useEffect(() => {

        if (soundFolders && (!soundFoldersWithSounds || !soundFoldersWithSounds[soundFolders[0].id])) {
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

            if (!e || isLoading) return
            const id = parseInt(e)
            if (soundFoldersWithSounds && soundFoldersWithSounds[id]) return
            setId(id)
            setEnable(true)


        }} type="single" collapsible className="w-full flex items-center justify-center">

            {soundFolders && soundFolders.map(soundFolder => {


                return <>
                    {!isLoading ? <AccordionItem className='capitalize w-full' value={soundFolder.id.toString()}>
                        <AccordionTrigger>{soundFolder.name}</AccordionTrigger>
                        <AccordionContent className="w-full flex items-start  gap-1 flex-col max-h-80 overflow-auto">
                            {soundFoldersWithSounds && soundFoldersWithSounds[soundFolder.id] && soundFoldersWithSounds[soundFolder.id].sounds.map(sound => {

                                return <button onClick={() => {
                                    setSound(sound)
                                }} className='flex px-2  w-full border-4 items-center justify-between py-1.5' key={sound.id}>
                                    <p >{sound.name}</p>
                                    <button onClick={(e) => {
                                        e.stopPropagation()
                                        playAudio(sound.soundUrl)
                                    }}><PlayCircleIcon color="black" /></button>
                                </button>
                            })}
                        </AccordionContent>
                    </AccordionItem> : <Loading />}
                </>
            })}
            {isLoadingSoundFolders && <Loading />}

        </Accordion>
    )
}

export default DisplaySounds