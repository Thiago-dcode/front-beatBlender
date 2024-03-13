'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import React, { useEffect } from 'react'

export default function LogoutPage() {

    const router = useRouter()

    useEffect(() => {

        signOut({
            redirect: true,
            callbackUrl: '/login'
        })

    }, [])
    return (
        <div></div>
    )
}
