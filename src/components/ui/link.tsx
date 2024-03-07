import React from 'react'
import Link from 'next/link'
type props = {
    message: string,
    linkMessage: string,
    route: string
}
function LinkComponent({message,linkMessage,route}:props) {
  return (
    <div className='text-white flex items-center gap-2'>
    <p>{message}</p>
  <Link className='font-bold text-app-blueLink'  href={route}>{linkMessage}</Link>
  </div>
  )
}

export default LinkComponent