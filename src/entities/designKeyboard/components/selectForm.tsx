'use client'

import React, { Dispatch, SetStateAction, useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FormControl } from '@/components/ui/form'
import { ControllerRenderProps } from 'react-hook-form'
import { FormKeyboardValidateType } from '@/entities/keyboard/validate'
import { useGetDesignKeyboard } from '../hooks/useGetDesignKeyboard'
import { HttpClientError } from '@/lib/exceptions/exceptions'
import { signOut } from 'next-auth/react'
import { DesignKeyboard } from '@/types'

type props = {
    setDesign: Dispatch<SetStateAction<DesignKeyboard | undefined>>,
    field: ControllerRenderProps<FormKeyboardValidateType, 'design'>,
}
function SelectForm({ setDesign, field }: props) {
    const { data, error, isPending } = useGetDesignKeyboard({
        enable: true
    })
    useEffect(() => {
        console.log('data,error,isPending', data, error, isPending)
        if (error) {

            if (error instanceof HttpClientError) {
                if (error.statusCode === 401 || error.statusCode === 403) {
                    signOut({
                        redirect: true,
                        callbackUrl: '/login'
                    })

                }
            }
        }

    }, [data, error, isPending])

    return (
        <>
            {!error && !isPending && <Select onValueChange={(e) => {
                field.onChange(e)
                setDesign(undefined)
                const designKeyboard = data.find((dk) => e === dk.name)
                if (designKeyboard) {
                    setDesign(prev => designKeyboard)
                }


            }} defaultValue={field.value}>
                <FormControl className='bg-transparent capitalize'>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a keyboard design" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent className='bg-app-background text-white' >


                    {data && data.sort((a, b) => {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();
                        if (nameA < nameB) return -1;
                        if (nameA > nameB) return 1
                        return 0;
                    }).map(designKeyboard => {


                        return (
                            <SelectItem className='capitalize' key={designKeyboard.path} value={designKeyboard.name}>
                                {designKeyboard.name}
                            </SelectItem>
                        )
                    })}


                </SelectContent>
            </Select>}


        </>
    )
}

export default SelectForm