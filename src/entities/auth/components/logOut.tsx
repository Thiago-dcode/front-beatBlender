'use client'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
function LogOut() {
    const { data, status } = useSession()

    useEffect(() => {
        console.log('CLIENT SESSION', data, status)

    }, [data, status])
    return (
        <div>
            <Button onClick={async () => {

                signOut({ redirect: true, callbackUrl: '/login' })


            }}> Logout </Button>
        </div>
    )
}

export default LogOut