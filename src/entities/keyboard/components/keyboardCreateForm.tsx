'use client'

import React, { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Loading, Size } from '@/components/ui/loading'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormKeyboardValidateType } from '../validate'
import { useGetDesignKeyboard } from '@/entities/designKeyboard/hooks/useGetDesignKeyboard'
import { UseFormReturn } from 'react-hook-form'
type props = {
    children: ReactNode,
    form: UseFormReturn<FormKeyboardValidateType>,

}
export default function KeyboardCreateForm({ children, form }: props) {

    const handleSubmit = (values: FormKeyboardValidateType) => {
        console.log('submit', values)
    }

    const customOnChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'name' | 'description', max: number) => {
        form.clearErrors()
        if (e.target.value === ' ' && e.target.value.length === 1) {
            form.setValue(field, '')
            return
        }
        if (e.target.value.length >= max) {
            form.setValue(field, e.target.value.slice(0, max))
            form.control.setError(field, { message: 'Reach  ' + max + ' max characters' })
            return
        }
    }


    return (
        <>



            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full max-w-sm flex flex-col gap-4 text-white text-2xl m-4'>

                    <FormField control={form.control} name='name' render={({ field }) => {
                        return <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>

                                <Input required placeholder='Reggae dance(3-12 words)' type='text'{...field} onChange={(e) => {
                                    field.onChange(e)
                                    customOnChange(e, 'name', 12)

                                }} />
                            </FormControl >
                            <FormMessage />
                        </FormItem>
                    }} />
                    <FormField control={form.control} name='description' render={({ field }) => {
                        return <FormItem>
                            <FormLabel>Short description</FormLabel>
                            <FormControl>
                                <Input required placeholder='A keyboard made for make people dance!(3-100 words)' type='text'{...field} onChange={(e) => {
                                    field.onChange(e)
                                    customOnChange(e, 'description', 100)

                                }} />
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
    )
}
