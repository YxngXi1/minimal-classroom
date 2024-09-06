'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import useWindowSize from '@/utils/useWindowSize';

const Navbar = () => {
    const { width } = useWindowSize();

    // Define what width you consider as desktop or mobile
    const isDesktop = width > 1024;

    return (
        <main className='flex flex-col justify-center items-center m-4'>
            <div className='container flex flex-col'>
                    {isDesktop ? (
                        <div className='flex justify-between mb-4'>
                            <Link href='/classrooms'>
                                <p className=''>minimal classroom</p>
                            </Link> 
                            <div className='flex w-3/12 justify-between'>
                                <Link href='/announcements'>
                                    <p>Home</p>
                                </Link>
                                <Link href='/classwork'>
                                    <p>Classwork</p>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className='flex justify-between'>
                            <Link href='/announcements'>
                                <p>Home</p>
                            </Link>
                            <Link href='/classwork'>
                                <p>Classwork</p>
                            </Link> 
                        </div>
                    )}
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