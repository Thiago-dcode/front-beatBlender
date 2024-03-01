'use client'
import useRegisterForm from '@/entities/auth/hooks/useRegisterForm'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { FormValidateType } from '@/entities/auth/validate'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { CustomError } from '@/lib/exceptions/exceptions'


export default function Register() {
  const [dataToSubmit, setDataToSubmit] = useState<FormValidateType>()
  const form = useRegisterForm()
  const { errors } = form.formState
  // implement REACT QUERY
  const mutation = useMutation({
    mutationFn: async (formData: FormValidateType) => {

      const result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

    },
    onSuccess(data, variables, context) {
      console.log(data)
    },
    onError(error, variables, context) {
      //TODO: handle error
      console.log('ERROR', error)
      form.setError('email', { message: 'some email error' })
    },
  })
  const handleSubmit = (values: FormValidateType) => {
    //this will only run when the form is validadted
    mutation.mutate(values)

  }
  // useEffect(() => {
  //   console.log(dataToSubmit)
  // }, [dataToSubmit])
  return (

    <div className='-mt-20 flex items-center justify-center h-full w-full'>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full max-w-md flex flex-col gap-4'>
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
          <Button type='submit' className='w-full'>Register</Button>
        </form>

      </Form>
    </div>
  )
}
