import React from 'react'
import Announcements from '@/utils/announcementData'
import Image from 'next/image';

const AnnouncementCard = () => {
  return (
    <main>
        <div className='flex flex-col gap-y-8'>
            {Announcements.map((announcement) => (
                <div key={announcement.announcementId} className='bg-gray-300'>
                    <div className='flex gap-x-2'>
                        <div className='relative w-[40px] h-[40px]'>
                            <Image
                                src={announcement.profilePic}
                                layout='fill'
                                objectFit='cover'
                                alt='profile picture'
                                className='w-full'
                            />
                        </div>
                        <p>{announcement.teacher}</p>
                    </div>
                    <p>{announcement.message}</p>
                </div>
            ))}
        </div>
    </main>
  );
};

export default AnnouncementCard