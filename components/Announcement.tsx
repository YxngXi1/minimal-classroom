import React from 'react'
import Announcements from '@/utils/announcementData'
import Image from 'next/image';

const AnnouncementCard = () => {
  return (
    <main>
        <div className='flex flex-col gap-y-8 mx-4'>
            {Announcements.map((announcement) => (
                <div key={announcement.announcementId} className='bg-gray-300 p-4 rounded-lg'>
                    <div className='flex gap-x-2 items-center mb-2'>
                        <div className='relative w-[40px] h-[40px]'>
                            <Image
                                src={announcement.profilePic}
                                layout='fill'
                                objectFit='cover'
                                alt='profile picture'
                                className='w-full rounded-full'
                            />
                        </div>
                        <p>{announcement.teacher}</p>
                    </div>
                    {announcement.type === "announcement" ? (
                        <p className='ml-[48px]'>{announcement.message}</p>
                    ) : (
                        <p className='ml-[48px]'><strong>New Assignment: </strong>{announcement.message}</p>
                    )}
                </div>
            ))}
        </div>
    </main>
  );
};

export default AnnouncementCard