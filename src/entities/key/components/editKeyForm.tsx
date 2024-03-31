"use client";
import KeyWrapper from "./keyWrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Color, key, keyWithSoundHandler } from "@/types";
import { PlayIcon, PlayCircleIcon, Divide } from "lucide-react";
import SeparationBar from "@/components/ui/separationBar";
import DivWrapper from "@/components/wrapper/DivWrapper";
import SoundHandler from "@/lib/core/soundHandler";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import DisplaySounds from "@/entities/sound/components/displaySounds";
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
    keyEntity?: keyWithSoundHandler,
    colors?: Color[]
}
export function EditKeyForm({ keyEntity = undefined, colors = undefined }: Props) {
    const [audio, setAudio] = useState<HTMLAudioElement | SoundHandler>(new Audio())
    const [keyPress, setKeyPress] = useState<string>();
    const [name, setName] = useState<string>();
    const [displayName, setDisplayName] = useState<string>();
    const [audioFile, setAudioFile] = useState<File>()
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

    const handleSetAudioFile = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return

        setAudioFile(e.target.files[0])
        const audioUrl = URL.createObjectURL(e.target.files[0])
        if (audio instanceof SoundHandler) {

            await audio.init(audioUrl)

        }
        else if (audio instanceof HTMLAudioElement) {
            audio.src = audioUrl

        }

    }
    useEffect(() => {

        if (!keyPress) {

            setDisplayName('')
        }
        if (keyPress && (!displayName || displayName === keyPress)) {
            setDisplayName(keyPress)
        }

    }, [keyPress])

    useEffect(() => {
        if (!keyEntity) return

        setKeyPress(keyEntity.key)
        setDisplayName(keyEntity.displayName)
        setName(keyEntity.name)

    }, [keyEntity])



    return (
        <div className="flex items-start justify-center w-full flex-col">
            <form className="flex flex-col items-center justify-center w-full gap-2" onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault();
                return
            }} onSubmit={handleSubmit}>
                {/* SOUND DIV */}

                <DivWrapper className="flex-col" title={<p>Sound</p>}>

                    {keyEntity && <DivWrapper className="gap-2 mb-2">
                        <p>Your current sound:</p>
                        <button onClick={() => {
                            keyEntity.soundHandler.play()
                        }}><PlayCircleIcon color="white" /></button>

                    </DivWrapper>}

                    <DivWrapper className=" justify-between">
                        <p className="text-center w-full">

                            Or choose a new from:

                        </p>

                        <div className=" w-1/2 flex flex-col items-center justify-center gap-2 self-end p-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant={'minimal'} className="w-full">
                                        Your audios
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="z-[99]">
                                  <DisplaySounds enable = {true}/>
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
                    {audio && <DivWrapper className="gap-2 mt-2">
                        <p>Your audio selected:</p>
                        <button onClick={() => {
                            audio.play()
                        }}><PlayCircleIcon color="white" /></button>

                    </DivWrapper>}
                </DivWrapper>
                <SeparationBar />
                <div>

                    {keyEntity && <div>
                        Or choose a new one
                    </div>}
                    <div className="text-white flex flex-col justify-center gap-2">
                        <Label htmlFor="sound">Sound</Label>

                    </div>
                </div>
                <div className="text-white flex flex-col justify-center gap-2">
                    <Label htmlFor="name">Key name</Label>
                    <Input id="name" name="name" className="text-center"


                        placeholder={'Your key name'}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}

                    />
                </div>
                <div className="text-white flex flex-col justify-center gap-2">
                    <Label htmlFor="key">Key</Label>
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
                </div>
                <div className="text-white flex flex-col justify-center gap-2">
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
                </div>
                <KeyWrapper id="null" bgColor="white" size={4}>

                    <button className="text-black capitalize">
                        {displayName}
                    </button>
                </KeyWrapper>
                <Button type="submit" size={"lg"} variant={'green'}>Edit</Button>
            </form>
        </div>
    );
}

export default EditKeyForm;
