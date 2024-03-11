'use client'
import KeyboardWrapper from "@/entities/keyboard/components/keyboardWrapper"
import MetaLink from "@/components/metaLink"
import { getServerSession } from "next-auth"
import KeyWrapper from "@/entities/key/components/keyWrapper"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { KeySize } from "@/types"
import KeyboardCreateForm from "@/entities/keyboard/components/keyboardCreateForm"
import useSession from "@/lib/hooks/useSession"
import { useEffect, useState } from "react"
import { stat } from "fs"
import { Loading } from "@/components/ui/loading"
import { beatFetcher } from "@/lib/core/httpClient"

export default function NewKeyboard({ params }: { params: { user: string } }) {
    const { data, status } = useSession()
    const [designUrl, setDesignUrl] = useState<string>()
    //TODO: fetch all resources necessary to build a keyboard:user(sounds,keys), designs, categories.

    useEffect(() => {
        if (status === 'unauthenticated' || (status === 'authenticated' && data?.user.username !== params.user)) redirect('/')
    }, [data, status, params.user])
    return <>
        {status === 'authenticated' && <div className="text-white">
            {designUrl && <MetaLink href={designUrl} />}
            <h1 className="text-3xl">Keyboard builder</h1>
            {/*TODO: keyboardform */}
            <KeyboardCreateForm setDesignUrl={setDesignUrl} >


                <KeyboardWrapper className="bg-white">
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => {

                            return (
                                <KeyWrapper key={n} bgColor="rgba(0,0,0,0.4)" size={KeySize.md} id={'example-key-' + n}><p className="text-xs">{n}</p></KeyWrapper>
                            )
                        })
                    }

                </KeyboardWrapper>
            </KeyboardCreateForm >


        </div>}
        {status !== 'authenticated' && <Loading />}
    </>
}