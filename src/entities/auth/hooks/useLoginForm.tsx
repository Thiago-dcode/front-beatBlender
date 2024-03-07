
import { useForm } from 'react-hook-form'
import { FormLoginValidateType } from '../validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { formLoginSchema } from '../validate'

const defaultValues = {

    username: '',
    password: '',

}
export function useLoginForm() {

    return useForm<FormLoginValidateType>({
        resolver: zodResolver(formLoginSchema),
        defaultValues
    })
}

type formValues = "username" | "password" | `root.${string}`


export function isFormValue(value: any): value is formValues {
    return ["username", "password"].includes(value) || (typeof value === 'string' && value.startsWith('root.'));
}