
import FreeKeyboards from "./FreeKeyboards";
import { getFreeKeyboard, getFreeKeyboards } from '../api';
import { EntityNotFoundError } from "@/lib/exceptions/exceptions";


export default async function FreeKeyboardsWrapper() {
    const keyboards = await getFreeKeyboards()
    if(!keyboards.length){
        throw new EntityNotFoundError('Something went wrong')
    }
    const data = await getFreeKeyboard(keyboards[0].name)
    return <>

        {keyboards && <FreeKeyboards keyboards={keyboards} keyboard={data?.keyboard} />}</>
}
