import React from 'react'
import { CustomError } from '@/lib/exceptions/exceptions'
import ErrorCode from './errorCode'

export default function Error({ error, children, message, errorCode = error instanceof CustomError ? error.statusCode : 500 }: { error: Error, children: React.ReactNode, message: string, errorCode?: number }) {

    return (
        <div className='mt-40 flex flex-col items-center justify-self-center gap-2' >
            {<h2>{error.message}</h2>}
            <ErrorCode errorCode={errorCode} />
            <p>{message}</p>
            {children}
        </div>
    )
}
