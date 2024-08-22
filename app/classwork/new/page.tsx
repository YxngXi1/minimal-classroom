'use client'

import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation';
import { getRoleFromQuery, getRoleFromSession } from '@/utils/checkRole';

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

  if (role === "student") {
    return <div className='min-h-screen mx-auto items-center'>Sorry, you cannot view this page</div>;
  }

  return (
    <div>page</div>
  )
}

export default Page