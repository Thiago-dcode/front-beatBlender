
import FreeKeyboards from "./FreeKeyboards";
import { getFreeKeyboard, getFreeKeyboards } from '../api';
import { EntityNotFoundError } from "@/lib/exceptions/exceptions";
import { beatFetcher } from "@/lib/core/httpClient";
import { Keyboard, KeyboardWithKeysAndDesign } from "@/types";


export default async function FreeKeyboardsWrapper() {
    const keyboards: Keyboard[] = await beatFetcher.get(`/free/keyboards`);

    if (!keyboards || !keyboards.length) {
        
        throw new EntityNotFoundError('Something went wrong')
    }
    const keyboard: KeyboardWithKeysAndDesign = await beatFetcher.get(`/free/keyboards/${keyboards[0].name}`)
    return <>

        {keyboards && <FreeKeyboards keyboards={keyboards} keyboard={keyboard} />}</>
}
