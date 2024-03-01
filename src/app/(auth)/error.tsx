'use client' // Error components must be Client Components
import ErrorComponent from '@/components/error/error'
import { Button } from '@/components/ui/button'
import Main from '@/components/wrapper/Main'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <Main>  <ErrorComponent message='If the error persist, please contact our support team support@beatblender.com' error={error} >
            <Button onClick={() => {
                reset()
            }}>Try again</Button>
        </ErrorComponent>
        </Main >


    )
}