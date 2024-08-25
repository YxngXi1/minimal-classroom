'use client'

import React, { useEffect, useState, Suspense } from 'react';
import { useSession } from 'next-auth/react'

const Page = () => {
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
  if (role === "student") {
    return <div className='min-h-screen mx-auto items-center'>Sorry, you cannot view this page</div>;
  }

  return (
    <div>page</div>
  );
};

export default Page;