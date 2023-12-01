import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BookCard from "@/components/BookCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import genreBackground from "@/public/img/romanceGenre.jpg"

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
      <div className="h-72 flex shadow-inner border bg-cover bg-no-repeat bg-center bg-blend-multiply bg-neutral-400" style={{backgroundImage: `url(${genreBackground.src})`}}>
        <h1 className="text-4xl md:text-6xl m-auto font-semibold text-white">Romance</h1>
      </div>
      <div>
        <div className="mx-auto px-12 py-24 lg:max-w-7xl lg:px-8">
          <div className="mb-12">
            <h1 className="text-3xl mb-4">Description</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit veritatis eum excepturi repellendus, explicabo et iure mollitia id at hic, porro vero fuga omnis! Quis molestiae neque impedit minima quae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nostrum illo error, recusandae libero blanditiis animi quam at totam dolore illum, expedita consectetur atque quidem quasi tempore, soluta obcaecati officiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis voluptatum sapiente maxime dolorem nulla. Neque quod temporibus, tempore accusamus architecto ullam dolorum rerum deleniti sit vero nisi impedit alias reprehenderit!</p>
          </div>
          <div className="md:flex gap-5">
            <div className="md:w-64 lg:w-72 py-4">
              <div className="border border-neutral-300 sticky top-10">
                <div className="w-full p-4 bg-neutral-100 text-xl border-b border-neutral-300 ">
                  <h2>Filter your result</h2>
                </div>
                <div className="p-4">
                  <input type="text" placeholder="Search books by name" className="mb-4 h-12 w-full px-3 border border-neutral-200 outline-gray-300"/>
                  <input type="text" placeholder="Search books by author" className="mb-4 h-12 w-full px-3 border border-neutral-200 outline-gray-300"/>
                  <Select>
                    <SelectTrigger className="rounded-none h-12 border-neutral-200">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">Rating ≥ 4</SelectItem>
                      <SelectItem value="3">Rating ≥ 3</SelectItem>
                      <SelectItem value="2">Rating ≥ 2</SelectItem>
                      <SelectItem value="1">Rating ≥ 1</SelectItem>
                      <SelectItem value="0">Rating ≥ 0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="py-4 flex-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-12">
              {books.map((book) => (
                <BookCard key={book.name} name={book.name} author={book.author} image={book1.src} />
              ))}
            </div>
          </div>
        </div>
      </div>  
      <Footer />
    </div>
  );
}
