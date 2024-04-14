import React from 'react'


function ErrorMessage( {text}:{text:string}) {
  return (
    <p className="!text-destructive !w-full !text-center">{text}</p>
  )
}

export default ErrorMessage