import { Book } from '@/types/interfaces';

export default function BookCard({book}: {book: Book}) {
  console.log("Book URL: " + book.imageUrl);

  return (
    <div style={{backgroundImage: `url(${book.imageUrl})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white shadow-md relative group" >
      <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
        <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-2">{book.title}</span>
        {
          book.authors.map((author, index) => (
            <div key={author.id}>
              <span className="text-xs md:text-sm lg:text-md italic line-clamp-2">{index === 0 ? "" : ", "}{author.name}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
}
