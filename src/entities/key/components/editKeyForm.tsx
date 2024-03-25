'use client'

import { ErrorText, FontSize } from '@/components/form/formError'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Loading, Size } from '@/components/ui/loading'

import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useKeyForm } from '../hooks/useKeyForm'

export function EditKeyForm() {
    const form = useKeyForm()
    const handleSubmit = () => {

    }
    return (
        <div className='-mt-20 flex items-center justify-center h-full w-full flex-col'>
            {true && <>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full max-w-sm flex flex-col gap-4 text-white text-2xl m-4'>

                        <FormField control={form.control} name='key' render={({ field }) => {
                            return <FormItem>
                                <FormLabel>Your username</FormLabel>
                                <FormControl>
                                    <Input required placeholder='Press a key' type='text'{...field} />
                                </FormControl >
                                <FormMessage />
                            </FormItem>
                        }} />
                        <FormField control={form.control} name='displayName' render={({ field }) => {
                            return <FormItem>
                                <FormLabel>Your password</FormLabel>
                                <FormControl>
                                    <Input required type='text'{...field} />
                                </FormControl >
                                <FormMessage />
                            </FormItem>
                        }} />

                        {!true ? <Button type='submit' variant={'white'} className='w-full'>Edit</Button> : <div className='w-full flex items-center justify-center'> <Loading size={Size.md} color='fill-app-greenPastel' /></div>}
                        <div>
                            <ErrorText fontSize={FontSize.md} message={``} />
                        </div>
                    </form>
                </Form>
            </>}



        </div>
    )
}

export default editKeyForm