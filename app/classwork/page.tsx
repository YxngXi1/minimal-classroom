'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getRoleFromQuery, getRoleFromSession } from '@/utils/checkRole';
import Assignments from '@/utils/assignments';
import Units from '@/utils/units';
import Link from 'next/link';
import Image from 'next/image';

interface Assignment {
  assignmentId: number;
  name: string;
  deadline: string;
  description: string;
  attachements: string;
  class: string;
  unit: number; // Changed to number to match unit ID type
}

const Page = () => {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const queryRole = getRoleFromQuery(searchParams);
    const sessionRole = getRoleFromSession();
    setRole(queryRole || sessionRole);
  }, [searchParams]);

  if (!role) {
    return <div>Please specify a role.</div>;
  }

  return (
    <main className='container'>
      {role === "teacher" ? (
        <div className='mb-20 mt-2 hide-on-desktop flex justify-between mx-4'>
          <h1 className='text-5xl font-semibold text-center'>Classwork</h1>
          <Link href='/classwork/new'>
            <button>
                <Image
                  src='/plus-sign.svg'
                  height={40}
                  width={40}
                  alt='submit'
                  />
              </button>
          </Link>
        </div>
      ) : (
        <h1 className='text-5xl font-semibold mb-20 mt-2 hide-on-desktop text-center'>Classwork</h1>
      )}
      <div className='flex flex-col justify-center items-center'>
        {Units.map((unit) => (
          <div key={unit.id} className='w-11/12 mb-6'>
            <div className='flex w-full text-2xl justify-center items-center'>
              <h1 className='inline-block whitespace-nowrap'>{unit.name}</h1>
              <hr className='border border-black w-full mx-2' />
            </div>

            <div className='w-full'>
              {Assignments.filter((assignment) => assignment.unit === unit.id).map((assignment) => (
                <Link href={`/classwork/${assignment.slug}`} key={assignment.assignmentId}>
                  <div className='flex flex-col text-left border p-2 mb-2'>
                    <p className='text-md font-bold'>{assignment.name}</p>
                    <p className='text-sm text-gray-500'>{assignment.deadline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Page;
