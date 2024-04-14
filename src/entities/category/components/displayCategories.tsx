'use client'

import { Input } from '@/components/ui/input'
import { ChangeEvent, useEffect, useState } from 'react'
import DropDown from '@/components/ui/dropDown'
import { useGetCategories } from '../hooks/useGetCategories'
import { Button } from '@/components/ui/button'
import { category } from '@/types'
import { truncateString } from '@/lib/utils'
type Props = {

    setCategory?: (category: string) => void,
    category?: string
}
function DisplayCategories({ setCategory = () => { }, category = '' }: Props) {
    //get categories
    const [open, setOpen] = useState(false)
    const [mouseOverDropDown, setMouseOverDropDown] = useState(false)
    const { data: categories, isPending } = useGetCategories({
        enable: open,
    })
    useEffect(() => {
        if (!open) return


    }, [open])
    useEffect(() => {
        console.log(categories)
    }, [categories])
    return (
        <DropDown className='bg-transparent w-fit h-fit z-[99]' open={open} preventDefault={true} trigger={<Input  onFocus={() => {

            setOpen(true)

        }} onBlur={() => {
            if (mouseOverDropDown) return
            setOpen(false)

        }} value={category} onChange={(e) => {

            setCategory(truncateString(e.target.value.trim(),10))

        }} className="z-[99] text-center" placeholder="category" />}>


            {categories && !isPending && <div className='z-[99] max-h-40 overflow-auto   px-4 py-2 bg-white flex flex-col items-center  gap-2' onMouseLeave={() => {
                setMouseOverDropDown(false)
            }} onMouseEnter={() => {
                setMouseOverDropDown(true)
            }}>

                {categories.filter(_category => _category.name.includes(category)).map(_category => {

                    return (
                        <Button type="button" variant={'ghost'} className='w-full text-black  p-1' onClick={(e) => {
                            e.stopPropagation()

                            setCategory(_category.name)
                            setOpen(false)

                        }} key={_category.name}>{_category.name}</Button>
                    )
                })}

            </div>}

        </DropDown>
    )
}

export default DisplayCategories