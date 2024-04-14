import DivWrapper from '@/components/wrapper/DivWrapper'
import { cn } from '@/lib/utils'
import { PlayCircleIcon } from 'lucide-react'
import React from 'react'

type Props = {

    handlePlay?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    text: string,
    className?: string
}

function PlayButton({ handlePlay = () => { }, text, className = '' }: Props) {
    return (
        <DivWrapper className={cn("gap-2", className)}>
            <p>{text}</p>
            <button type="button" onClick={(e) => {
                handlePlay(e)

            }}><PlayCircleIcon color="white" /></button>

        </DivWrapper>
    )
}

export default PlayButton