import Image from 'next/image';
import React from 'react'

const Navbar = () => {
  return (
    <main className='flex flex-col justify-center items-center my-4'>
        <div className='container flex flex-col'>
            <div className='flex justify-between mb-4'>
                <p>Home</p>
                <p>Classwork</p>
            </div>
            <div className='flex justify-center'>
                <div className='relative w-full h-6'>
                    <Image
                        src='/navbar-line.svg'
                        layout='fill'
                        objectFit='cover'
                        alt='navbar-line'
                        className='w-full'
                    />
                </div>
            </div>
        </div>
    </main>
  )
}

export default Navbar;