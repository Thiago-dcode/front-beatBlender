
import React from 'react'
import Link from 'next/link'
import Section from '@/components/wrapper/Section'
import FreeKeyboardsWrapper from '@/entities/free/components/FreeKeyboardsWrapper'
import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import LinkComponent from '@/components/ui/link'
async function Home() {
    const session = await getServerSession(authOptions)
    return (
        <>
            <Section style={{
            }} flex='col'>
                <Section >
                    {/* TODO: render skeleton */}
                    <Suspense fallback={<p>Loading...</p>}>
                        <FreeKeyboardsWrapper />
                    </Suspense>
                </Section>

                <Section >
                    {!session && <LinkComponent message='Want to BLENDER your own keyboards?' route='/register' > start Here</LinkComponent>}
                    {session && <LinkComponent classname='' message='' route={`/${session.user.username}/keyboard/new`} >Blend your own keyboard</LinkComponent>}
                </Section>
            </Section>

            <Section className='bg-white'>

                    <p>Render some users</p>
               
            </Section>

            <Section  className='bg-white' >
                <div className='w-full text-center h-full'>

                    <p>Render something else</p>
                </div>
            </Section>

        </>
    )
}

export default Home