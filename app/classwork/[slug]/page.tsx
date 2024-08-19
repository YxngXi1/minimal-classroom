'use client';

import React, { FC, useEffect, useState } from 'react';
import Assignments from '@/utils/assignments';
import { useParams } from 'next/navigation';
import FileUploadButton from '@/components/uploadFileButton';
import { useSearchParams } from 'next/navigation';
import { getRoleFromQuery, getRoleFromSession } from '@/utils/checkRole';
import Link from 'next/link';
import Image from 'next/image'

const Page: FC = () => {
    const searchParams = useSearchParams();
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
    const queryRole = getRoleFromQuery(searchParams);
    const sessionRole = getRoleFromSession();
    setRole(queryRole || sessionRole);
    }, [searchParams]);

    if (!role) {
    return <div>Please specify a role.</div>;
    }   
    const params = useParams();
    const { slug } = params;

    const assignment = Assignments.find((assignment) => assignment.slug === slug);

    if (!assignment) {
        return <p>Assignment not found</p>;
    }

  return (
    <main className='flex justify-center items-center container'>
        <div className='flex justify-center items-center flex-col w-11/12 gap-y-8'>
            <h1 className='text-5xl font-semibold text-center hide-on-desktop'>{assignment.name}</h1>
            <p className='text-md text-left'>{assignment.description}</p>
            <p className='text-md text-left w-full'>Due by: {assignment.deadline}</p>
            <div className='flex flex-col gap-y-4 w-full'>
            <p className='text-3xl'>Grade: <strong><u>{assignment.grade !== null ? assignment.grade : '__'}</u></strong></p>
                <form className='flex justify-between items-center gap-x-4'>
                    <FileUploadButton />
                    <button
                        type="submit"
                        value="Upload"
                        className='bg-[#D9D9D9] px-4 h-12 text-center rounded'
                    >
                        Submit
                    </button>
                    </form>

                <div className='bg-[#D9D9D9] rounded p-4 flex flex-col justify-center items-center gap-y-8'>
                    <p>Private Comments</p>
                    <p>Coming soon...</p>
                </div>
            </div>
        </div>
    </main>
  );
};

export default Page;