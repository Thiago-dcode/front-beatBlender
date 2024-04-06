
import FreeKeyboards from "./FreeKeyboards";
import { getFreeKeyboard, getFreeKeyboards } from '../api';
import { EntityNotFoundError } from "@/lib/exceptions/exceptions";
import { beatFetcher } from "@/lib/core/httpClient";
import { KeyboardWithKeysAndDesign } from "@/types";


export default async function FreeKeyboardsWrapper() {
    const keyboards = await getFreeKeyboards()
    if(!keyboards.length){
        throw new EntityNotFoundError('Something went wrong')
    }
    const keyboard:KeyboardWithKeysAndDesign = await beatFetcher.get(`/free/keyboards/${keyboards[0].name}`)
    console.log(keyboard)
    return <>

        {keyboards && <FreeKeyboards keyboards={keyboards} keyboard={keyboard} />}</>
}
