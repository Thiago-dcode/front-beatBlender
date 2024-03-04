import { Effect } from '@/types'
import { IconType } from '@react-icons/all-files'
import React, { useEffect, useState } from 'react'
import EffectIcon from './effectIcon'
import '../style.css'
function Effects({ effects }: {

    effects: Effect[]
}) {


    return (
        <>
            {effects && <div title={`ffdf`} className='flex items-center justify-end gap-0.5 w-full absolute top-0 p-1'>{

                effects.filter(eff => eff.isActive).map((effect, i) => {

                    return (

                        <EffectIcon key={i} effect={effect} />
                    )
                })


            }</div>}
        </>

    )
}

export default Effects