'use client'
import ErrorComponent from '@/components/error/error'
import { Button } from '@/components/ui/button'
import Main from '@/components/wrapper/Main'
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <Main>
                    <ErrorComponent message='If the error persist, please contact our support team support@beatblender.com' error={error} >
                        <Button onClick={() => {
                            reset()
                        }}>Try again</Button>
                    </ErrorComponent>
                </Main>
            </body>
        </html>
    )
}