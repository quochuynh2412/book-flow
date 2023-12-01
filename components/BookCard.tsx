export default function BookCard({name, author, image} : {name: string, author: string, image: string}) {

  return (
    <div style={{backgroundImage: `url(${image})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white shadow-md relative group" >
      <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
        <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">{name}</span>
        <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- {author}</span>
      </div>
    </div>
  );
}