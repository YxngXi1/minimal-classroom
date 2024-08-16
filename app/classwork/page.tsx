'use client'

import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation';
import { getRoleFromQuery, getRoleFromSession } from '@/utils/checkRole';

const Page = () => {
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
        <div>classwork</div>
    )
}

export default Page;