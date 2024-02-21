import Link from 'next/link'
import Main from '@/components/wrapper/Main'
import Error from '@/components/error/error'
import { Button } from '@/components/ui/button'
import { CustomError } from '@/lib/exceptions/exceptions'
export default function NotFound() {
    return (
        <Main>
            <Error message="Ups, that page doens't exist" error={new CustomError('Not found', {}, 404)} >
                <Button><Link href={'/'}>Go Home</Link></Button>
            </Error>
        </Main>
    )
}