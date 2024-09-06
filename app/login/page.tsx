'use client'

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <>
      <div className='flex flex-col justify-center items-center gap-y-2'>
        <h1>Feel free to register using your PDSB mail</h1>
          <button onClick={() => signIn('google', { callbackUrl: '/name-selection '})} className='p-4 bg-blue-500'>
            Sign in with Google
          </button>
      </div>
    </>
  );
}
