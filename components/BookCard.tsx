import Link from 'next/link';

import { Book } from '@/types/interfaces';
import { Skeleton } from './ui/skeleton';
import React from 'react';

export default function BookCard({ book }: { book: Book }) {

  return (
    <>
      {book != null ? (
        <Link href={`/book/${book.id}`} style={{ backgroundImage: `url(${book.imageUrl || '/img/book-cover-placeholder.png'})` }} className="bg-contain aspect-[6/9] rounded-lg bg-white shadow-md border border-neutral-300 relative group" >
          <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out align-bottom justify-end flex flex-col">
            <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-2 font-serif">{book.title}</span>
            <span className="text-xs md:text-sm lg:text-md italic line-clamp-2">
              {book.authors.map((author, index) => (
                <React.Fragment key={index}>
                  {index === 0 ? "" : ", "}
                  {author.name}
                </React.Fragment>
              ))}
            </span>
          </div>
        </Link>
      ) : (
        <Skeleton className="bg-contain aspect-[6/9] rounded-lg bg-white shadow-md border border-neutral-300 relative group" />
      )}
    </>
  );
}
