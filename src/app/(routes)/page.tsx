
import React from 'react'

import Section from '@/components/wrapper/Section'
import FreeKeyboardsWrapper from '@/entities/free/components/FreeKeyboardsWrapper'
import { Suspense } from 'react'

async function Home() {




    return (
        <div>
            <Section style={
                { background: 'rgba(0,0,0,0.8)' }
            }><h1 className='text-7xl text-white'>Beat Blender</h1></Section>
            <Section>
                <Suspense fallback={<p>Loading...</p>}>
                    <FreeKeyboardsWrapper />
                </Suspense>
            </Section>

        </div>
    )
}

export default Home