'use client'

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { getRoleFromQuery, getRoleFromSession } from '@/utils/checkRole';
import Image from 'next/image';
import Assignments from '@/utils/assignments'; // Ensure Assignments is exported correctly
import Link from 'next/link';

const NameCard: React.FC = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [role, setRole] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        const queryRole = getRoleFromQuery(searchParams);
        const sessionRole = getRoleFromSession();
        setRole(queryRole || sessionRole);

        if (pathname === '/announcements') {
            setTitle('Announcements');
        } else if (pathname === '/classwork') {
            setTitle('Classwork');
        } else {
            const match = pathname.match(/\/classwork\/([^\/]+)/); // Extract the slug
            if (match && match[1]) {
                const slug = match[1];
                const assignment = Assignments.find(a => a.slug === slug);
                if (assignment) {
                    setTitle(assignment.name);
                } else {
                    setTitle('Insert Dynamic Title'); // Fallback if assignment not found
                }
            } else {
                setTitle('Insert Dynamic Title'); // Fallback if not matching expected pattern
            }
        }
    }, [searchParams, pathname]);

    if (!role) {
        return <div>Please specify a role.</div>;
    }

    return (
        <main className='container'>
            <div className='text-left mb-4 ml-2'>
                <p className='text-5xl'>{title}</p>
            </div> 
            <div className='flex flex-col justify-center items-center bg-[#D9D9D9] rounded-md py-16 ml-2'>
                {role === "teacher" ? (
                    <div className='text-center flex flex-col mb-4 items-center'>
                        <div className='mb-2 flex flex-col gap-y-1'>
                            <p className='text-4xl font-semibold'>Mrs. Greenaway</p>
                            <p className='text-xl'>Teacher</p>
                        </div>
                        <Image
                            src="/placeholder-person.jpg"
                            height={200}
                            width={200}
                            alt='profile picture'
                            className='rounded-full'
                        />
                    </div>
                ) : (
                    <div className='text-center flex flex-col mb-4 items-center'>
                        <div className='mb-2 flex flex-col gap-y-1'>
                            <p className='text-4xl font-semibold'>Yang Xue</p>
                            <p className='text-xl'>Student</p>
                        </div>
                        <Image
                            src="/placeholder-person.jpg"
                            height={200}
                            width={200}
                            alt='profile picture'
                            className='rounded-full'
                        />
                    </div>
                )}
                <div className='flex flex-col justify-center items-center bg-white w-11/12 '>
                    <h1 className='text-xl py-2'>Upcoming Tasks</h1>
                    <div className='h-[200px] w-11/12 overflow-scroll flex flex-col gap-y-2 mb-2' style={{ direction: 'rtl' }}>
                        {Assignments.map((assignment) => (
                            <Link href={`/classwork/${assignment.slug}`} key={assignment.assignmentId}>
                                <div className='flex items-center justify-between bg-[#D9D9D9] p-2 w-11/12 rounded-lg' style={{ direction: 'ltr' }}>
                                    <div className='flex flex-col w-8/12 text-left'>
                                        <p className='text-[10px] font-bold'>{assignment.name}</p>
                                        <p className='text-[10px] text-gray-500'>{assignment.deadline}</p>
                                    </div>
                                    <p className='text-right text-[10px] w-4/12'>{assignment.class}'s Classroom</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <p className='text-red-600 text-3xl underline mt-6'>Log Out</p>
            </div>
        </main>
    );
}

export default NameCard;