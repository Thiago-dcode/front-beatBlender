
import { Effect } from "@/types";
import { Volume2, Repeat2, VolumeX } from "lucide-react";
import { useEffect, useState, useCallback } from "react";



export default function EffectIcon({ effect, size = 15 }: {
    effect: Effect, size?: number
}) {

    const [title, setTitle] = useState('')

    useEffect(() => {
        switch (effect.name) {
            case 'loop':
                setTitle(`${effect.name} bpm: ${effect.config.bpm || 'disabled'}`);
                break;
            case 'volume':
                if (effect.config.level > 0) {
                    setTitle(`${effect.name} ${Math.round(effect.config.level * 100)}%`);
                } else {
                    setTitle(`${effect.name}: muted`);
                }
                break;
            default:
                break;
        }
    }, [effect]);
    const renderIcon = useCallback(() => {

        switch (effect.name) {
            case 'loop':

                return <Repeat2 size={size} />
            case 'volume':

                if (effect.config.level > 0) {

                    return <Volume2 size={size} />

                }

                return <VolumeX size={size} />

            default:
                break;
        }

    }, [effect, size])


    return <span id={`loop-effect-${effect.id}`} className=" rounded-full text-white bg-green-300/80" title={title}>{renderIcon()}</span>
}