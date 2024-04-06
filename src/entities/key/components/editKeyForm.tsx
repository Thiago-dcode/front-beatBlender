"use client";
import KeyWrapper from "./keyWrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Color, DesignKeyboard, Sound, key, keyWithSoundHandler } from "@/types";
import { XCircle } from "lucide-react";
import SeparationBar from "@/components/ui/separationBar";
import DivWrapper from "@/components/wrapper/DivWrapper";
import SoundHandler from "@/lib/core/soundHandler";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import DisplaySounds from "@/entities/sound/components/displaySounds";
import { truncateString } from "@/lib/utils";
import Info from "@/components/ui/Info";
import KeyButton from "./keyButton";
import usePlayAudio from "../hooks/usePlayAudio";
import PlayButton from "@/entities/sound/components/playButton";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@radix-ui/react-select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@radix-ui/react-dropdown-menu";
// const allowedKeys = [
//     'KeyA', 'KeyB', 'KeyC', 'KeyD', 'KeyE', 'KeyF', 'KeyG', 'KeyH', 'KeyI', 'KeyJ', 'KeyK', 'KeyL', 'KeyM',
//     'KeyN', 'KeyO', 'KeyP', 'KeyQ', 'KeyR', 'KeyS', 'KeyT', 'KeyU', 'KeyV', 'KeyW', 'KeyX', 'KeyY', 'KeyZ',
//     'Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9',
//     'Backquote', 'Minus', 'Equal', 'BracketLeft', 'BracketRight', 'Backslash', 'Semicolon', 'Quote',
//     'Comma', 'Period', 'Slash', 'IntlBackslash', 'Space',
//     'NumLock', 'Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9',
//     'NumpadAdd', 'NumpadSubtract', 'NumpadMultiply', 'NumpadDivide', 'NumpadEnter', 'NumpadDecimal', 'NumpadComma'
// ];
type Props = {
    keyEntity?: key,
    design?: DesignKeyboard
}
export function EditKeyForm({ keyEntity = undefined, design = undefined }: Props) {
    const playAudio = usePlayAudio()
    const [audioSrc, setAudioSrc] = useState('')
    const [keyPress, setKeyPress] = useState<string>();
    const [name, setName] = useState<string>();
    const [bgColor, setBgColor] = useState<string>()
    const [keyColor, setKeyColor] = useState<string>()
    const [displayName, setDisplayName] = useState<string>();
    const [audioFile, setAudioFile] = useState<File>()
    const [sound, setSound] = useState<Sound>()
    const [isOpenPop, setIsOpenPop] = useState(false)
    const [placeHolder, setPlaceHolder] = useState('Select a key')
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const notAllowedKeys = [
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "Insert",
            "Delete",
            "Home",
            "End",
            "PageUp",
            "PageDown",
            "ShiftLeft",
            "ShiftRight",
            "ControlLeft",
            "ControlRight",
            "AltLeft",
            "AltRight",
            "MetaLeft",
            "MetaRight",
            "CapsLock",
            "Tab",
            "Escape",
            "Enter",
            "F1",
            "F2",
            "F3",
            "F4",
            "F5",
            "F6",
            "F7",
            "F8",
            "F9",
            "F10",
            "F11",
            "F12",
            "ContextMenu",
            "PrintScreen",
            "Pause",
            "ScrollLock",
            "Backspace",
        ];
        if (e.code === 'Backspace') {

            setKeyPress(undefined)

            return
        }
        if (notAllowedKeys.includes(e.code) || e.key === 'Dead') {
            alert("key not allowed");
            return;
        }
        if (e.code === 'Space') {
            setKeyPress(e.code);
            return;
        }

        setKeyPress(e.key);


    };
    const handleSetDisplayName = (str: string) => {


        setDisplayName(truncateString(str, 5))

    }
    const handleSetSound = (_sound: Sound) => {

        setSound(_sound)
        setAudioFile(undefined)
        setAudioSrc(_sound.soundUrl)
        setIsOpenPop(false)
        handleSetName(_sound.name)
    }
    const handleSetName = (str: string) => {


        setName(truncateString(str))

    }
    const handleSetAudioFile = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return
        setSound(undefined)
        const file = e.target.files[0]
        setAudioFile(file)
        handleSetName(file.name)
        const audioUrl = URL.createObjectURL(e.target.files[0])
        setAudioSrc(audioUrl)

    }
    useEffect(() => {

        handleSetDisplayName(keyPress || '')

    }, [keyPress])

    useEffect(() => {

        if (!keyEntity) return
        setAudioSrc(keyEntity.sound.soundUrl)
        setKeyPress(keyEntity.key)
        setDisplayName(keyEntity.displayName)
        setName(keyEntity.name)
        console.log(keyEntity)
        setBgColor(keyEntity.bgColor)
        setKeyColor(keyEntity.keyColor)

    }, [keyEntity])






    return (
        <div className="flex items-start justify-center w-full flex-col ">
            <form className="flex flex-col items-center justify-center w-full gap-2 text-white " onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault();
                return
            }} onSubmit={handleSubmit}>
                {/* SOUND DIV */}

                <h3 className="text-white text-xl">{keyEntity ? "Edit key" : "Create key"}</h3>
                <SeparationBar />
                <DivWrapper className="flex-col" title={<Info iconColor="white" text='Choose the key audio' />}>

                    {keyEntity && <PlayButton handlePlay={() => {
                        playAudio(keyEntity.sound.soundUrl)
                    }} text="Your current audio:" />}

                    <DivWrapper className=" justify-between">
                        <p className="text-center w-full">

                            Or choose a new from:

                        </p>

                        <div className=" w-1/2 flex flex-col items-center justify-center gap-2 self-end p-2">
                            <Popover open={isOpenPop}>
                                <PopoverTrigger asChild>
                                    <Button onClick={() => {
                                        setIsOpenPop(!isOpenPop)
                                    }} variant={'minimal'} className="w-full">
                                        Your audios
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="z-[99]">
                                    <DisplaySounds setSound={handleSetSound} enable={true} />
                                </PopoverContent>
                            </Popover>

                            <Button variant={'minimal'} className="w-full" onClick={() => {

                                document.getElementById('audio-file-input')?.click()
                            }}>
                                Your files
                            </Button>
                            <Input accept="audio/*" type="file" id="audio-file-input" name="sound" value={undefined} className="hidden"
                                onChange={(e) => {

                                    handleSetAudioFile(e)




                                }}
                                hidden
                                placeholder={'Choose a sound'}

                            />

                        </div>

                    </DivWrapper>
                    {(audioFile || sound) && audioSrc && <DivWrapper className="mb-2" ><PlayButton className="" handlePlay={() => {
                        playAudio(audioSrc)
                    }} text="Your audio selected:" /><button onClick={() => {
                        setAudioFile(undefined)
                        setSound(undefined)
                        setAudioSrc(keyEntity ? keyEntity.sound.soundUrl : '')
                    }} className="pr-2"><Info text="remove audio selected" icon={<XCircle color="red" />} /></button></DivWrapper>}
                </DivWrapper>
                <SeparationBar />


                <DivWrapper title={<Info iconColor="white" text='Choose a identifying name for your key(up to 10 characters)' />} className="flex-col gap-2 self-center items-center px-2 max-w-48">
                    <Label htmlFor="name">Key name</Label>
                    <Input id="name" name="name" className="text-center"


                        placeholder={'Your key name'}
                        value={name}
                        onChange={(e) => {
                            handleSetName(e.target.value.trim())
                        }}

                    />
                </DivWrapper>
                <SeparationBar />
                <DivWrapper className="gap-2 px-2" >
                    <DivWrapper className=" flex-col gap-2 items-center justify-center">
                        <Label htmlFor="key" className="flex items-center justify-between gap-2"><span>Key</span> <Info iconSize={15} iconColor="white" text='Click on the Key box, and them press a KEY from your keyboard to choose a key.' /></Label>
                        <Input id="key" name="key" className="text-center"
                            onChange={(e) => {
                                e.target.value = "";
                            }}
                            onFocus={() => {
                                setPlaceHolder('Now press a key')
                            }}
                            onBlur={() => {
                                setPlaceHolder('Select a key')
                            }}

                            placeholder={placeHolder}
                            value={keyPress}
                            onKeyDown={(e) => {
                                handleKeyDown(e)
                            }}
                        />
                    </DivWrapper>
                    <DivWrapper className="flex-col gap-2 items-center justify-center" >
                        <Label htmlFor="display-name">Display Name</Label>
                        <Input name="display-name" id="display-name" className="text-center"


                            placeholder={'Display key name'}
                            value={displayName}
                            onChange={(e) => {
                                if (!e.target.value) {
                                    setDisplayName(keyPress)
                                    return
                                }
                                if (e.target.value.length > 3) return
                                setDisplayName(e.target.value)
                            }}

                        />
                    </DivWrapper>
                </DivWrapper>
                <SeparationBar />

                {design &&
                    <DivWrapper title={<Info iconColor="white" text={`Colors availables from your keyboard design: ${design.name} `} />} className="gap-9">
                        {['background', 'text'].map(str => {


                            return <div key={str} className="flex flex-col items-center
                                    justify-center">
                                <p className="capitalize">{str}</p>
                                <div className="gap-2  flex " >
                                    {design.colors.map(color => <button onClick={(e) => {
                                        switch (str) {
                                            case 'background':
                                                setBgColor(color.color)
                                                return;
                                            case 'text':
                                                setKeyColor(color.color)
                                                return;

                                            default:
                                                return;
                                        }


                                    }} style={{
                                        background: color.color
                                    }} className="h-8 w-8" key={color.color}></button>)}
                                </div>
                            </div>
                        })}
                    </DivWrapper>



                }
                <SeparationBar />
                <KeyWrapper id="null" bgColor={bgColor} size={4}>
                    {keyEntity && <KeyButton keyColor={keyColor} onClick={() => {
                        playAudio(audioSrc)
                    }} keyEntity={keyEntity} enableKeyDown={true} />}
                </KeyWrapper>
                <SeparationBar />
                <Button type="submit" size={"lg"} variant={'green'}>Edit</Button>
                
            </form>
        </div>
    );
}

export default EditKeyForm;
