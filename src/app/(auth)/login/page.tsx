'use client'
import { useLoginForm, isFormValue } from '@/entities/auth/hooks/useLoginForm'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Loading, Size } from '@/components/ui/loading'
import { FormLoginValidateType } from '@/entities/auth/validate'
import { ErrorText, FontSize } from '@/components/form/formError'
import Keyboard from '@/entities/keyboard/components/keyboard'
import { useGetFreeKeyboard } from '@/entities/free/hooks/useGetFreeKeyboard'
import { KeySize } from '@/types'
import LinkComponent from '@/components/ui/link'
import { useRouter } from 'next/navigation'
import UseTimer from '@/lib/hooks/UseTimer'

import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import FormSuccess from '@/components/form/formSuccess'

export default function Login() {
  const [isPending, setIspending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [username, setUsername] = useState<string>()
  const router = useRouter()
  const { timer, start } = UseTimer()
  const form = useLoginForm()
  const { data, error } = useGetFreeKeyboard({
    name: 'login',
    enable: true,
    stale: 60 * 60 * 60
  })
  const { errors } = form.formState
  // implement REACT QUERY

  const handleSubmit = async (values: FormLoginValidateType) => {
    //this will only run when the form is validated
    setIspending(true)
    const result = await signIn('credentials', { redirect: false, ...values })
    setIspending(false)
    if (result) {
      console.log(result)

      if (result.error) {

        form.setError('root', {
          message: result.error
        })
        return
      }
      setIsSuccess(true)
      start()
      setUsername(values.username)
    }
  }
  useEffect(() => {
    if (!isSuccess || timer < 2 || !username) return

    router.push(`${username}`)
    router.refresh()

  }, [isSuccess, timer, router, username])

  return (

    <div className='-mt-20 flex items-center justify-center h-full w-full flex-col'>
      {!isSuccess && <>
        {data?.keyboard && <Keyboard enableKeyDown={false} keyboard={data?.keyboard} keySize={KeySize.sm} displayName={false} />}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full max-w-sm flex flex-col gap-4 text-white text-2xl m-4'>

            <FormField control={form.control} name='username' render={({ field }) => {
              return <FormItem>
                <FormLabel>Your username</FormLabel>
                <FormControl>

                  <Input required placeholder='jhondo' type='text'{...field} />
                </FormControl >
                <FormMessage />
              </FormItem>
            }} />
            <FormField control={form.control} name='password' render={({ field }) => {
              return <FormItem>
                <FormLabel>Your password</FormLabel>
                <FormControl>
                  <Input required type='password'{...field} />
                </FormControl >
                <FormMessage />
              </FormItem>
            }} />

            {!isPending ? <Button type='submit' variant={'white'} className='w-full'>Login</Button> : <div className='w-full flex items-center justify-center'> <Loading size={Size.md} color='fill-app-greenPastel' /></div>}
            <div>
              <ErrorText fontSize={FontSize.md} message={`${errors['root']?.message || ' '}`} />
            </div>
          </form>

          <LinkComponent message="Don't have an account?" route='/register'>Create one. </LinkComponent>
        </Form>
      </>}
      {isSuccess && <FormSuccess timer={timer} timerBrake={2} message='Sucessfully loggedin' />}


    </div>
  )
}
