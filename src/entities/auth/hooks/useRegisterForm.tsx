
import { useForm } from 'react-hook-form'
import { FormRegisterValidateType } from '../validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { formRegisterSchema } from '../validate'

const defaultValues = {
    email: '',
    username: '',
    password: '',
    passwordConfirm: ''
}
export function useRegisterForm() {

    return useForm<FormRegisterValidateType>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues
    })
}

type formValues = "email" | "username" | "password" | "passwordConfirm" | "root" | `root.${string}`


export function isFormValue(value: any): value is formValues {
    return ["email", "username", "password", "passwordConfirm", "root"].includes(value) || (typeof value === 'string' && value.startsWith('root.'));
}