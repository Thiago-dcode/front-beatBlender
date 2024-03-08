
import KeyboardWrapper from "@/entities/keyboard/components/keyboardWrapper"
import MetaLink from "@/components/metaLink"
import { getServerSession } from "next-auth"
import KeyWrapper from "@/entities/key/components/keyWrapper"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { KeySize } from "@/types"
import KeyboardCreateForm from "@/entities/keyboard/components/keyboardCreateForm"

const defaultKLeys = [

]
export default async function NewKeyboard({ params }: { params: { user: string } }) {

    const session = await getServerSession(authOptions)
    if (!session || session.user.username !== params.user) redirect('/')
    //TODO: fetch all resources necessary to build a keyboard:user(sounds,keys), designs, categories.

    return <div className="text-white">
        {/* <MetaLink href={'gf'} /> */}
        <h1 className="text-3xl">Keyboard builder</h1>
        {/*TODO: keyboardform */}
        <KeyboardCreateForm >
            <KeyboardWrapper className="bg-white">
                {
                    [1, 2, 3, 4, 5,6,7,8,9].map(n => {

                        return (
                            <KeyWrapper key={n} bgColor="rgba(0,0,0,0.4)" size={KeySize.md} id={'example-key-' + n}><p className="text-xs">{n}</p></KeyWrapper>
                        )
                    })
                }

            </KeyboardWrapper>
        </KeyboardCreateForm >


    </div>
}