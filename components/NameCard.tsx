'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { getRoleFromQuery, getRoleFromSession } from '@/utils/checkRole';
import Image from 'next/image';

const NameCard = () => {
    const searchParams = useSearchParams();
    const [role, setRole] = useState(null);
  
    useEffect(() => {
      const queryRole = getRoleFromQuery(searchParams);
      const sessionRole = getRoleFromSession();
      setRole(queryRole || sessionRole);
    }, [searchParams]);
  
    if (!role) {
      return <div>Please specify a role.</div>;
    }

  return (
    <main>
        {role === "teacher" ? (
            <div>
                <p>Mrs. Greenaway</p>
                <p>Teacher</p>
            </div>
        ) : (
            <div>
                <p>Yang Xue</p>
                <p>Student</p>
                <Image
                    src="/placeholder-person.jpg"
                    height={200}
                    width={200}
                    alt='profile picture'
                    />
            </div>
        )}
        <div>
            <h1></h1>
            <div className='h-[300px] w-10/12 overflow-scroll'>
                
            </div>
        </div>
    </main>
  )
}

export default NameCard