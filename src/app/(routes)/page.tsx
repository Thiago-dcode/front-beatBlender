
import React from 'react'
import Link from 'next/link'
import Section from '@/components/wrapper/Section'
import FreeKeyboardsWrapper from '@/entities/free/components/FreeKeyboardsWrapper'
import { Suspense } from 'react'

async function Home() {




    return (
        <div className='flex  flex-col gap-2'>
            <Section ><h1 className='text-2xl text-white'>BEAT BLENDER</h1></Section>
            <Section style={{
            }} flex='col'>
                <Section>
                    <Suspense fallback={<p>Loading...</p>}>
                        <FreeKeyboardsWrapper />
                    </Suspense>
                </Section>

                <Section>

                    <div className='text-white'>
                        <h2 className='text-4xl'>Want to BLENDER your own keyboards?</h2>
                        <Link href={'/register'}> Start here </Link>
                    </div>
                </Section>
            </Section>

            <Section style={{
                background: 'white'
            }}>
                <div className='bg-white w-full text-center h-full'>

                    <p>Render some users</p>
                </div>
            </Section>
            <Section style={{
                background: 'white'
            }} >
                <div className='w-full text-center h-full'>

                    <p>Render something else</p>
                </div>
            </Section>

        </div>
    )
}

export default Home