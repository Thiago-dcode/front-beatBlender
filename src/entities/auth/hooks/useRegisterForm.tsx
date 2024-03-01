
import { useForm } from 'react-hook-form'
import { FormValidateType } from '../validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from '../validate'
function useRegisterForm() {

    return useForm<FormValidateType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            username: '',
            password: '',
            passwordConfirm: ''
        }
    })
}

export default useRegisterForm