
import React from 'react'

import Section from '@/components/wrapper/Section'
import FreeKeyboards from '@/components/keyboard/FreeKeyboardsWrapper'
import { Suspense } from 'react'

async function Home() {




    return (
        <div>

            <h1>Beat Blender</h1>

            <Section>
                <Suspense fallback={<p>Loading...</p>}>
                    <FreeKeyboards />
                </Suspense>
            </Section>

        </div>
    )
}

export default Home