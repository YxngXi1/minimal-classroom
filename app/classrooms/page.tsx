import React from 'react'
import { useSession } from 'next-auth/react';
import Classrooms from '@/utils/classrooms'
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
    const { data: session, status } = useSession();
    const { role } = session?.user || {};
    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (!session || !session.user) {
        return <div>Please log in.</div>;
    }
    if (!role) {
        return <div>Please specify a role.</div>;
    }
  return (
    <>

        <div>
            {role === "teacher" ? (
                <div className='flex justify-between items-center  mb-20 mt-2 mx-2'>
                    <h1 className='hide-on-desktop text-5xl font-semibold'>Classrooms</h1>
                    <button type='submit' className=''>
                        <Image
                        src='/plus-sign.svg'
                        height={40}
                        width={40}
                        alt='submit'
                        />
                    </button>
                </div> 
            ) : (
                <h1 className='hide-on-desktop text-5xl font-semibold mb-20 mt-2 '>Classrooms</h1>
            )}
            <div className='grid grid-cols-2 gap-x-6 gap-y-3'>
                {Classrooms.map(classroom => (
                    <Link  key={classroom.id} href={`/classrooms/${classroom.slug}`}>
                        <div className='bg-gray-300 py-4 rounded-md'>
                            <div className='mx-2 flex items-center gap-x-2'>
                                <Image
                                    src={classroom.teacherPic}
                                    height={40}
                                    width={40}
                                    alt='teacher profile picture'
                                    className='rounded-full'
                                    />
                                <h1>{classroom.teacher}'s Classroom</h1>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </div>

    </>
  )
}

export default page