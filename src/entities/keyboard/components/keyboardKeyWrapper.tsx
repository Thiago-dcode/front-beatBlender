import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Info from '@/components/ui/Info'
type props = {
    children: ReactNode,
    className?: string,
    showToolTip?: boolean
}
function KeyboardKeyWrapper({ children, className = '', showToolTip=false }: props) {
    return (



        <div className={cn('keyboard flex gap-2 flex-wrap items-center justify-center flex-grow py-3 px-2 m-auto max-w-3xl relative', className)} id='keyboard'>
            
            
             {children}
             
             <div className='self-end absolute top-0 -right-5'>
                    {showToolTip && <Info iconColor='white' text='Right Click over the key to edit it' />}
                </div>
             </div>
    )
}

export default KeyboardKeyWrapper
