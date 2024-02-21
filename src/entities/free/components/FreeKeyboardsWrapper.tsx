
import { Keyboard } from '@/types'
import FreeKeyboards from "./FreeKeyboards";
import { InternalError } from '@/lib/exceptions/exceptions';
import { getFreeKeyboard } from '../api';

const getFreeKeyboards = async () => {

    try {
        const res = await fetch(`${process.env.HOST}/free/keyboards`)
        if (!res.ok) {
            throw new Error('Free keyboards not found')
        }
        const data: {
            keyboards: Keyboard[]
        } = await res.json()

        return data.keyboards
    } catch (error) {
        throw new InternalError('Internal error')
    }

}
export default async function FreeKeyboardsWrapper() {
    const keyboards = await getFreeKeyboards()
    const data = await getFreeKeyboard(keyboards[0].id)
    return <>{keyboards && <FreeKeyboards keyboards={keyboards} keyboard={data?.keyboard} />}</>
}
