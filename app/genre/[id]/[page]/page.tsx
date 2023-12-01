import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

import book1 from "@/public/book1.webp";

export default function Genre({ params } : {params: {id: string, page: string}}) {

  const { id, page } = params;  

  const books = [
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
    { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
  ]  

  return (
    <div>
      <Header />
      <div className="h-52 flex shadow-inner border">
        <h1 className="text-4xl md:text-6xl m-auto font-semibold">Romance</h1>
      </div>
      <div>
        <div className="mx-auto px-12 py-24 lg:max-w-7xl lg:px-8">
          <div className="">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit veritatis eum excepturi repellendus, explicabo et iure mollitia id at hic, porro vero fuga omnis! Quis molestiae neque impedit minima quae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nostrum illo error, recusandae libero blanditiis animi quam at totam dolore illum, expedita consectetur atque quidem quasi tempore, soluta obcaecati officiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis voluptatum sapiente maxime dolorem nulla. Neque quod temporibus, tempore accusamus architecto ullam dolorum rerum deleniti sit vero nisi impedit alias reprehenderit!</p>
          </div>
          <div className="lg:flex gap-5">
            <div className="w-full lg:w-72 py-4">
              <div className="w-full border border-neutral-300 sticky top-10">
                <div className="flex p-4">
                  <input type="text" placeholder="Filter your books.." className="h-12 w-full px-5 border border-neutral-200 outline-gray-300"/>
                </div>
              </div>
            </div>
            <div className="py-4 flex-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-12">
              {books.map((book) => (
                <div key={book["name"]} style={{backgroundImage: `url(${book1.src})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white shadow-md relative group" >
                  <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
                    <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">{book["name"]}</span>
                    <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- {book["author"]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
