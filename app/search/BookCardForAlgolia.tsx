"use client"
import Link from 'next/link';

import { Skeleton } from '@/components/ui/skeleton';
import { OriginalBook } from '@/types/interfaces';
import { storage } from '@/lib/firebase';
import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref } from '@firebase/storage';

export default function BookCardForAlgolia({ book }: { book: OriginalBook }) {
  const [image, setImage] = useState<string | null>('/img/book-cover-placeholder.png');
  const storageRef = ref(storage, book.imageID);
  useEffect(() => {
    async function getImage() {
      await getDownloadURL(storageRef).then((url) => {
        setImage(url);
      }).catch((error) => {
        console.error("Failed to fetch image:", error)
      });
    }
    getImage();
  }, []);
  return (
    <>
      {book != null ? (
        <Link href={`/book/${book.objectID}`} className="w-max h-max" >
          <div style={{ backgroundImage: `url(${image})` }} className='bg-contain aspect-[6/9] rounded-lg bg-white shadow-md border border-neutral-300 w-full h-full relative group'>
            <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out align-bottom justify-end flex flex-col">
              <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-2 font-serif">{book.title}</span>
              <span className="text-xs md:text-sm lg:text-md italic line-clamp-2">
                {book.author.map((author, index) => (
                  <React.Fragment key={index}>
                    {index === 0 ? "" : ", "}
                    {author}
                  </React.Fragment>
                ))}
              </span>
            </div>
          </div>
        </Link>
      ) : (
        <Skeleton className="bg-contain aspect-[6/9] rounded-lg bg-white shadow-md border border-neutral-300 relative group" />
      )}
    </>
  );
}
