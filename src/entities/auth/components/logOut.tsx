'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
function LogOut() {
    return (
        <div>
            <Button onClick={async () => {

                signOut({ redirect: true, callbackUrl: '/login' })


            }}> Logout </Button>
        </div>
    )
}

export default LogOut