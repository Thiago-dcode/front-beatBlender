
import FreeKeyboards from "./FreeKeyboards";
import { getFreeKeyboard, getFreeKeyboards } from '../api';


export default async function FreeKeyboardsWrapper() {
    const keyboards = await getFreeKeyboards()
    const data = await getFreeKeyboard(keyboards[0].name)
    return <>

        {keyboards && <FreeKeyboards keyboards={keyboards} keyboard={data?.keyboard} />}</>
}
