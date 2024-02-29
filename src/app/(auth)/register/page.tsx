import React from 'react'
import { Button } from '@/components/ui/button'
export default function Register() {
  return (
    <form className='flex flex-col items-center justify-center w-full h-screen' action="">

      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
      </div>

      <div >
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>

      <div >
        <label htmlFor="password">Passowrd</label>
        <input type="password" name="password" id="password" />
      </div>
      <Button type='submit'>Submit</Button>
    </form>
  )
}
