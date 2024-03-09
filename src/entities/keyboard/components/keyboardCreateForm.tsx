'use client'

import React, { Dispatch, ReactNode, SetStateAction, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Loading, Size } from '@/components/ui/loading'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl, FormDescription } from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { useKeyboardForm } from '@/entities/keyboard/hooks/useKeyboardForm'
import { FormKeyboardValidateType } from '../validate'
import { useQuery } from '@tanstack/react-query'
import { beatFetcher } from '@/lib/core/httpClient'

type props = {
    children: ReactNode,
    setDesignUrl: Dispatch<SetStateAction<string | undefined>>,
}
export default function KeyboardCreateForm({ children, setDesignUrl }: props) {
    const form = useKeyboardForm()
    const handleSubmit = (values: FormKeyboardValidateType) => {
        console.log('submit', values)
    }
    const { data, error, isPending } = useQuery({
        queryKey: ['keyboard-designs'],
        queryFn: () => beatFetcher.get('/design-keyboard')
    })
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

    useEffect(() => {

        console.log('data,error,ispending', data, error, isPending)

    }, [data, error, isPending])
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
                            <FormField
                                control={form.control}
                                name="design"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Keyboard design</FormLabel>
                                        <Select onValueChange={(e) => {
                                            field.onChange(e)

                                            setDesignUrl('design-url')

                                        }} defaultValue={field.value?.toString()}>
                                            <FormControl className='bg-transparent'>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a keyboard design" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='bg-transparent text-white' >

                                                {/* TODO: render fetched designs */}
                                                <SelectItem value={'1'}>m@example.com</SelectItem>

                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Check in the example below keyboard how it looks
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
