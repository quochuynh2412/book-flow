import book1 from "@/public/book1.webp";


const books = [
  { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
  { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
  { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
  { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
  { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
  { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
]

export default function Discover() {
  return (
    <div id="discover" className="py-32">
      <h1 className="text-center text-6xl lg:text-8xl mb-12 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-black">DISCOVER</h1>
      
      <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center mb-8 md:mb-12 font-extrabold text-yellow-400">BEST OF ALL TIME</h2>
        <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6">
          {books.map((book) => (
            <div key={book["name"]} style={{backgroundImage: `url(${book1.src})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white shadow-md relative group" >
              <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
                <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">{book["name"]}</span>
                <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- {book["author"]}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-8">
        <button className="mx-auto text-neutral-600 bg-neutral-100 p-3 text-md rounded-xl border-2 hover:bg-neutral-200 active:bg-neutral-300 shadow-md active:shadow-none font-semibold">Explore More</button>
        </div>
      </div>

      <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center mb-8 md:mb-12 font-extrabold text-yellow-400">BOOKS OF THE MONTH</h2>
        <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6 ">
          {books.map((book) => (
            <div key={book["name"]} style={{backgroundImage: `url(${book1.src})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white relative group shadow-md" >
              <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
                <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">{book["name"]}</span>
                <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- {book["author"]}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-8">
          <button className="mx-auto text-neutral-600 bg-neutral-100 p-3 text-md rounded-xl border-2 hover:bg-neutral-200 active:bg-neutral-300 shadow-md active:shadow-none font-semibold">Explore More</button>
        </div>
      </div>

      <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center mb-8 md:mb-12 font-extrabold text-yellow-400">RISING STARS</h2>
        <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6 ">
          {books.map((book) => (
            <div key={book["name"]} style={{backgroundImage: `url(${book1.src})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white shadow-md relative group" >
              <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
                <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">{book["name"]}</span>
                <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- {book["author"]}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-8">
        <button className="mx-auto text-neutral-600 bg-neutral-100 p-3 text-md rounded-xl border-2 hover:bg-neutral-200 active:bg-neutral-300 shadow-md active:shadow-none font-semibold">Explore More</button>
        </div>
      </div>
    </div>
  );
}
