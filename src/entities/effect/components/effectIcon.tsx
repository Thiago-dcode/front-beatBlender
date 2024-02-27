
import { Effect } from "@/types";
import { Volume2, Repeat2, VolumeX } from "lucide-react";



export default function EffectIcon({ effect, size = 15 }: {
    effect: Effect, size?: number
}) {

    const renderIcon = () => {

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

    }


    return <span id={`loop-effect-${effect.id}`} className=" rounded-full text-white bg-green-300/80" title={`${effect.name} active`}>{renderIcon()}</span>
}