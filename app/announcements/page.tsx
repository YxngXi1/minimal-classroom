'use client'

import React, { useEffect, useState, Suspense } from 'react';
import AnnouncementCard from '@/components/Announcement';
import { useSearchParams } from 'next/navigation';
import { getRoleFromQuery, getRoleFromSession } from '@/utils/checkRole';
import Image from 'next/image';

const Page = () => {
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

  return (
    <main className='container'>
      <div className='w-full flex flex-col justify-center items-center'>
        
        <h1 className='text-5xl font-semibold mb-20 mt-2 hide-on-desktop'>Announcements</h1>
        {role === 'teacher' && (
          <div className='w-full'>
            <form className='bg-gray-300 mx-4 flex p-2 justify-evenly items-center mb-8'>
              <textarea
                className='bg-gray-300 w-10/12 resize-none overflow-hidden p-4'
                placeholder='Type New Announcement'
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${target.scrollHeight}px`;
                }}
              ></textarea>
              <button type='submit' className=''>
                <Image
                  src='/plus-sign.svg'
                  height={40}
                  width={40}
                  alt='submit'
                  />
              </button>
            </form>
          </div>
        )}
        <AnnouncementCard />
      </div>
    </main>
  );
};

const PageWithSuspense = () => (
  <Suspense>
  </Suspense>
);

export default PageWithSuspense;