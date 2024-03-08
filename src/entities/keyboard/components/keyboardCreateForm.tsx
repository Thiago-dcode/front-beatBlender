'use client'

import React, { ReactNode } from 'react'
import { ErrorText, FontSize } from '@/components/form/formError'
import { Button } from '@/components/ui/button'
import { Loading, Size } from '@/components/ui/loading'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useKeyboardForm } from '@/entities/keyboard/hooks/useKeyboardForm'
import { FormKeyboardValidateType } from '../validate'

type props = {
    children: ReactNode
}
export default function KeyboardCreateForm({ children }: props) {
    const form = useKeyboardForm()
    const handleSubmit = (values: FormKeyboardValidateType) => {
        console.log('submit', values)
    }
    return (
        <>
            {
                true && <>


                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full max-w-sm flex flex-col gap-4 text-white text-2xl m-4'>

                            <FormField control={form.control} name='name' render={({ field }) => {
                                return <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>

                                        <Input required placeholder='Reggae dance' type='text'{...field} />
                                    </FormControl >
                                    <FormMessage />
                                </FormItem>
                            }} />
                            <FormField control={form.control} name='description' render={({ field }) => {
                                return <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input required placeholder='A keyboard made for make people dance!' type='text'{...field} />
                                    </FormControl >
                                    <FormMessage />
                                </FormItem>
                            }} />
                            {children}
                            {true ? <Button type='submit' variant={'white'} className='w-full'>Craft!</Button> : <div className='w-full flex items-center justify-center'> <Loading size={Size.md} color='fill-app-greenPastel' /></div>}
                            {/* <div>
                                <ErrorText fontSize={FontSize.md} message={'some error'} />
                            </div> */}
                        </form>


                    </Form>
                </>
            }

        </>
    )
}
