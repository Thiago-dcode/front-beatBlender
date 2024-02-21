
import React from 'react'

import Section from '@/components/wrapper/Section'
import FreeKeyboardsWrapper from '@/entities/free/components/FreeKeyboardsWrapper'
import { Suspense } from 'react'

async function Home() {




    return (
        <div>

            <h1>Beat Blender</h1>

            <Section>
                <Suspense fallback={<p>Loading...</p>}>
                    <FreeKeyboardsWrapper />
                </Suspense>
            </Section>

        </div>
    )
}

export default Home