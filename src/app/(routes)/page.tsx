
import React from 'react'
import { Button } from '@/components/ui/button'
import Section from '@/components/wrapper/Section'
import FreeKeyboardsWrapper from '@/entities/free/components/FreeKeyboardsWrapper'
import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import LinkComponent from '@/components/ui/link'
import { ChevronRight } from 'lucide-react';
async function Home() {
    const session = await getServerSession(authOptions)
    return (
        <>

            <Section >
                <div className='text-white flex flex-col items-start gap-7 '>
                    <h1 className='text-5xl'>Beat Blender</h1>

                    <ul className='self-start text-2xl flex flex-col gap-2  mr-52'>
                        <li className='flex items-center  gap-2'> <ChevronRight /> <p>Upload your <span className='text-app-yellowCream px-1'>beats</span>.</p></li>
                        <li className='flex items-center  gap-2'> <ChevronRight /> <p> <span className='text-app-yellowCream px-1'>Craft</span> your own keyboard.</p></li>
                        <li className='flex items-center  gap-2'> <ChevronRight /><p>Personalize it with diverse <span className='text-app-yellowCream px-1'>designs.</span></p></li>
                        <li className='flex items-center  gap-2'> <ChevronRight /> <p><span className='text-app-yellowCream px-1'>Share </span> with the community.</p> </li>
                    </ul>

                    <LinkComponent classname='self-center' message='' route={`/${session ? `${session.user.username}/keyboard/new` : 'register'}`} ><Button size={'sm'} variant={'green'}>Start blending</Button></LinkComponent>

                </div>

            </Section>
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
                    {session && <LinkComponent classname='' message='' route={`/${session.user.username}/keyboard/new`} ><Button size={'lg'} variant={'green'}>Start blending now!</Button></LinkComponent>}
                </Section>
            </Section>

            <Section className='bg-white'>

                <p>Render some users</p>

            </Section>

            <Section className='bg-white' >
                <div className='w-full text-center h-full'>

                    <p>Render something else</p>
                </div>
            </Section>

        </>
    )
}

export default Home