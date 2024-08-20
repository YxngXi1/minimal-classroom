"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image';
import React from 'react'

const page = () => {

    const { data: session } = useSession();
  return (
    <main>
        { session ? (
            <div className='flex flex-col text-left'>
                <div className='flex '>
                    <img
                        src={session.user?.image as string}
                        className='rounded-full w-[40px] h-[40px]'
                        alt='profile pic'
                        />
                    <h1 className='text-3xl text-green-500'>welcome back, {session.user?.name}</h1>
                </div>
                <p>{session.user?.email}</p>
                <button onClick={() => signOut()} className='rounded-full p-4 bg-red-500'>Sign Out</button>
            </div>
        ) : (
            <div className='flex flex-col justify-center items-center gap-y-4'>
                <h1 className='text-3xl text-red-500 font-bold'>note logged in</h1>
                <div className='flex gap-x-4'>
                    <button onClick={() => signIn("google")} className='border border-black rounded-full p-4 bg-blue-500 text-white'>Sign in with Google</button>
                    <button onClick={() => signIn("github")} className='rounded-full p-4 bg-black text-white'>Sign in with Github</button>
                </div>
            </div>
        )}
    </main>
  )
}

export default page