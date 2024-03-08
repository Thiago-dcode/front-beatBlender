import React from 'react'
import Link from 'next/link'
type props = {
    message?: string,

    route: string,
    classname?: string
    children: React.ReactNode
}
function LinkComponent({ message = '', children, route, classname = '' }: props) {
    return (
        <div className={'text-white flex items-center gap-2 ' + classname}>
            <p>{message}</p>
            <Link className='font-bold text-app-greenPastel' href={route}>{children}</Link>
        </div>
    )
}

export default LinkComponent