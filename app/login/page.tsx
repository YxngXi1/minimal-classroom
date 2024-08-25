'use client'

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div>
      <p>aoisdjaoisdj</p>
      <button onClick={() => signIn('google', { callbackUrl: '/name-selection '})} className='p-4 bg-blue-500'>
        Sign in with Google
      </button>
    </div>
  );
}
