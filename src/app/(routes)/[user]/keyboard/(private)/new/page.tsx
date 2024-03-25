'use client'
import KeyboardKeyWrapper from "@/entities/keyboard/components/keyboardKeyWrapper"
import KeyboardWrapper from "@/entities/keyboard/components/keyboardWrapper"
import MetaLink from "@/components/metaLink"
import KeyWrapper from "@/entities/key/components/keyWrapper"
import { redirect } from "next/navigation"
import { DesignKeyboard, KeySize } from "@/types"
import KeyboardCreateForm from "@/entities/keyboard/components/keyboardCreateForm"
import useSession from "@/lib/hooks/useSession"
import { useEffect, useState } from "react"
import SelectForm from "@/entities/designKeyboard/components/selectForm"
import { Loading } from "@/components/ui/loading"
import { SheetSide } from "@/components/form/sheetSide"
import { FormField, FormItem, FormLabel, FormMessage, FormControl, FormDescription } from '@/components/ui/form'
import { useKeyboardForm } from "@/entities/keyboard/hooks/useKeyboardForm"
import DisplayKeys from "@/entities/key/components/displayKeys"

export default function NewKeyboard({ params }: { params: { user: string } }) {
    const { data, status } = useSession()
    const form = useKeyboardForm()
    const [design, setDesign] = useState<DesignKeyboard>()
    //TODO: fetch all resources necessary to build a keyboard:user(sounds,keys), designs, categories.

    useEffect(() => {
        if (status === 'unauthenticated' || (status === 'authenticated' && data?.user.username !== params.user)) redirect('/')
    }, [data, status, params.user])


    return <>
        {status === 'authenticated' && <div className="text-white">
            <KeyboardCreateForm form={form}  >
                <FormField
                    control={form.control}
                    name="design"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Keyboard design</FormLabel>
                            <SelectForm field={field} setDesign={setDesign} />
                            <FormDescription>
                                Check in the example below keyboard how it looks
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SheetSide title="Choose your keys" displayName="Add keys" >

                    {/* TODO: fetch user keys, allow user create key, fetch user sounds, allow user create sounds */}

                    <DisplayKeys enable={true} />

                </SheetSide>
                < KeyboardWrapper design={design} >
                    <KeyboardKeyWrapper >
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => {

                                return (
                                    <KeyWrapper key={n} size={KeySize.md} id={'example-key-' + n}><p className="text-xs">{n}</p></KeyWrapper>
                                )
                            })
                        }

                    </KeyboardKeyWrapper>
                </KeyboardWrapper>
            </KeyboardCreateForm >


        </div>}
        {status !== 'authenticated' && <Loading />}
    </>
}