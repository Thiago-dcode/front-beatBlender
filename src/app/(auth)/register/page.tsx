'use client'
import { useRegisterForm, isFormValue } from '@/entities/auth/hooks/useRegisterForm'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Loading, Size } from '@/components/ui/loading'
import { FormRegisterValidateType } from '@/entities/auth/validate'
import { useMutation } from '@tanstack/react-query'
import { beatFetcher } from '@/lib/core/httpClient'
import { HttpClientError } from '@/lib/exceptions/exceptions'
import { ErrorText, FontSize } from '@/components/form/formError'
import Keyboard from '@/entities/keyboard/components/keyboard'
import { useGetFreeKeyboard } from '@/entities/free/hooks/useGetFreeKeyboard'
import { KeySize } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import UseTimer from '@/lib/hooks/UseTimer'
import FormSuccess from '@/components/form/formSuccess'
import LinkComponent from '@/components/ui/link'

export default function Register() {
  const router = useRouter()
  const { timer, start } = UseTimer()
  const form = useRegisterForm()
  const { data, error } = useGetFreeKeyboard({
    name: 'register',
    enable: true,
    stale: 60 * 60 * 60
  })
  const { errors } = form.formState
  // implement REACT QUERY
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (formData: FormRegisterValidateType) => {

      return beatFetcher.post('/users', formData)


    },

    onSuccess(data, variables, context) {
      start()
    },
    onError(error, variables, context) {
      if (error instanceof HttpClientError) {
        console.error('ERROR REGISTERING A USER', error.errors)
        const variablesArr = Object.keys(variables)

        let hasError = false
        for (let index = 0; index < variablesArr.length; index++) {
          const variable = variablesArr[index];
          if (!isFormValue(variable)) continue
          const errorVar = error?.errors[variable]
          if (!errorVar) {
            continue
          }

          form.setError(variable, {
            message: errorVar
          })

          console.log(variable, errorVar)
          hasError = true
        }

        if (!hasError) {
          form.setError('root', {
            message: error.message
          })
          return
        }
        return
      }
      ``
      //error is not instanceof httpClientError
      form.setError('root', {
        message: 'Unexpected error, try again, if error persist contact our support'
      })


    },
  })

  const handleSubmit = (values: FormRegisterValidateType) => {
    //this will only run when the form is validadted
    mutate(values)

  }

  useEffect(() => {
    console.log(timer)
    if (!isSuccess || timer < 2) return

    router.push('/login')

  }, [isSuccess, timer, router])
  return (


    <div className='-mt-20 flex items-center justify-center h-full w-full flex-col'>
      {!isSuccess && <>
        {data?.keyboard && <Keyboard enableKeyDown={false} keyboard={data?.keyboard} keySize={KeySize.sm} displayName={false} />}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full max-w-md flex flex-col gap-4 text-white text-2xl m-4'>
            <FormField control={form.control} name='email' render={({ field }) => {
              return <FormItem>
                <FormLabel>Your email</FormLabel>
                <FormControl>

                  <Input placeholder='jhon@email.es' type='email'{...field} />
                </FormControl >
                <FormMessage />
              </FormItem>
            }} />
            <FormField control={form.control} name='username' render={({ field }) => {
              return <FormItem>
                <FormLabel>Your username</FormLabel>
                <FormControl>

                  <Input placeholder='jhondo' type='text'{...field} />
                </FormControl >
                <FormMessage />
              </FormItem>
            }} />
            <FormField control={form.control} name='password' render={({ field }) => {
              return <FormItem>
                <FormLabel>Your password</FormLabel>
                <FormControl>

                  <Input type='password'{...field} />
                </FormControl >
                <FormMessage />
              </FormItem>
            }} />
            <FormField control={form.control} name='passwordConfirm' render={({ field }) => {
              return <FormItem>
                <FormLabel>Confirm your password</FormLabel>
                <FormControl>
                  <Input type='password'{...field} />
                </FormControl >
                <FormMessage />
              </FormItem>
            }} />
            {!isPending ? <Button type='submit' variant={'white'} className='w-full'>Register</Button> : <div className='w-full flex items-center justify-center'> <Loading size={Size.md} color='fill-app-greenPastel' /></div>}
            <div>
              <ErrorText fontSize={FontSize.md} message={`${errors['root']?.message || ' '}`} />
            </div>
          </form>
          <LinkComponent message="Already have an account?" route='/login' >Login.</LinkComponent>

        </Form>
      </>}

      {isSuccess && <FormSuccess timer={timer} timerBrake={2} message='Successfully register' />}
    </div >
  )
}
