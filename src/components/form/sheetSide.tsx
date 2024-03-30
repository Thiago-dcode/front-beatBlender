"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { ReactNode, useState } from "react"

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

type SheetSide = (typeof SHEET_SIDES)[number]

type Props = {

    side?: SheetSide,
    title: string,
    description?: string,
    displayName: string,
    trigger?: ReactNode,
    close?: ReactNode,
    children: ReactNode,
    className?: string,
    open?: boolean,
    onOpenChange?: (e: boolean) => void
}

export function SheetSide({ open = false, onOpenChange = () => { }, side = 'left', displayName = 'open', title, description = '', trigger = undefined, close = <Button type="submit">Close</Button>, children, className = '' }: Props) {




    return (


        <Sheet  onOpenChange={(e) => {
            onOpenChange(e)
        }} open={open} key={side}>
            <SheetTrigger onClick={(e) => {

            }} asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent  className={cn(className)} side={side}>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>
                        {description}
                    </SheetDescription>
                </SheetHeader>
                {children}
                <SheetFooter>
                    {/* <SheetClose asChild>
                            {close}
                        </SheetClose> */}
                </SheetFooter>
            </SheetContent>
        </Sheet>


    )
}
