'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const EditProfile: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleNameChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setMessage('Name updated successfully!');
        router.refresh(); // Refresh session data
      } else {
        setMessage('Failed to update name.');
      }
    } catch (error) {
      console.error('Error updating name:', error);
      setMessage('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='container'>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-2xl mb-4'>Edit Profile</h1>
        {session ? (
          <form onSubmit={handleNameChange} className='flex flex-col items-center'>
            <label htmlFor='name' className='mb-2'>Name</label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mb-4 p-2 border border-gray-300 rounded'
            />
            <button
              type='submit'
              disabled={isSubmitting}
              className='bg-blue-500 text-white p-2 rounded'
            >
              {isSubmitting ? 'Updating...' : 'Update Name'}
            </button>
          </form>
        ) : (
          <p>Please log in to edit your profile.</p>
        )}
        {message && <p className='mt-4'>{message}</p>}
      </div>
    </main>
  );
};

export default EditProfile;
