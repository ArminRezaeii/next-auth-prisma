
import SignUpFrom from '@/components/SignUpFrom'
import { Image, Link } from '@nextui-org/react'
import React from 'react'

function SignUpPage() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-3'>

      <div className='md:col-span-2 flex justify-center items-center'>
        <p className='text-center p-2'>Already Singed up?</p>
        <Link href="/auth/signin">Sing in</Link>
      </div>

      <SignUpFrom />


    </div>
  )
}

export default SignUpPage