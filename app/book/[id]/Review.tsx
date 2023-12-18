import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Review() {
  return (
    <div className="md:flex gap-9">
      <div className="md:basis-5/12">
        <form className="mb-10 p-5 border border-neutral-300 mx-auto rounded-md sticky top-10">
          <div className="mt-3">
            <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your rating</label>
            <select id="rating" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>5 stars</option>
              <option>4 stars</option>
              <option>3 stars</option>
              <option>2 stars</option>
              <option>1 star</option>
            </select>
          </div>
          <div className="my-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Review title</label>
            <input type="text" id="email" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Best book I have read in..." required />
          </div>
          <div className="mb-10">
            <label  htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tell us what you think about this book</label>
            <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Overall, it is a great book..." required></textarea>
          </div>
          <button type="submit" className="mb-3 w-full text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">Submit</button>
        </form>
      </div>
      <div className="flex-1">
        <div>
          <div className="flex items-center mb-2">
            <svg
              className="w-7 h-7 text-yellow-400 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-7 h-7 text-yellow-400 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-7 h-7 text-yellow-400 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-7 h-7 text-yellow-400 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-7 h-7 text-gray-300 me-1 dark:text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-1 font-medium text-gray-500 dark:text-gray-400 text-lg">
              4.95 out of 5
            </p>
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            1,745 global ratings
          </p>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline w-[40px]"
            >
              5 star
            </a>
            <div className="flex-1 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-yellow-400 rounded"
                style={{ width: "70%" }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-[40px]">
              70%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline w-[40px]"
            >
              4 star
            </a>
            <div className="flex-1 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-yellow-400 rounded"
                style={{ width: "17%" }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-[40px]">
              17%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline w-[40px]"
            >
              3 star
            </a>
            <div className="flex-1 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-yellow-400 rounded"
                style={{ width: "8%" }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-[40px]">
              8%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline w-[40px]"
            >
              2 star
            </a>
            <div className="flex-1 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-yellow-400 rounded"
                style={{ width: "4%" }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-[40px]">
              4%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline w-[40px]"
            >
              1 star
            </a>
            <div className="flex-1 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-yellow-400 rounded"
                style={{ width: "1%" }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-[40px]">
              1%
            </span>
          </div>
        </div>
        <div className="mt-10">
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="5">5 Stars</TabsTrigger>
              <TabsTrigger value="4">4 Stars</TabsTrigger>
              <TabsTrigger value="3">3 Stars</TabsTrigger>
              <TabsTrigger value="2">2 Stars</TabsTrigger>
              <TabsTrigger value="1">1 Star</TabsTrigger>
            </TabsList>
            <TabsContent value="5">
              <div className="h-40 border rounded-lg border-neutral-300 p-5 mb-4">
                <h2 className="text-lg font-bold mb-2">Dang Thai Hoang</h2>
                <p className="line-clamp-3 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam consequatur commodi ea quisquam et delectus obcaecati sed perspiciatis, quae possimus eos quam inventore, temporibus ipsum magnam dolorem amet nulla saepe!</p>
              </div>
              <div className="h-40 border rounded-lg border-neutral-300 p-5 mb-4">
                <h2 className="text-lg font-bold mb-2">Dang Thai Hoang</h2>
                <p className="line-clamp-3 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam consequatur commodi ea quisquam et delectus obcaecati sed perspiciatis, quae possimus eos quam inventore, temporibus ipsum magnam dolorem amet nulla saepe!</p>
              </div>
              <div className="h-40 border rounded-lg border-neutral-300 p-5 mb-4">
                <h2 className="text-lg font-bold mb-2">Dang Thai Hoang</h2>
                <p className="line-clamp-3 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam consequatur commodi ea quisquam et delectus obcaecati sed perspiciatis, quae possimus eos quam inventore, temporibus ipsum magnam dolorem amet nulla saepe!</p>
              </div>
              <div className="h-40 border rounded-lg border-neutral-300 p-5 mb-4">
                <h2 className="text-lg font-bold mb-2">Dang Thai Hoang</h2>
                <p className="line-clamp-3 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam consequatur commodi ea quisquam et delectus obcaecati sed perspiciatis, quae possimus eos quam inventore, temporibus ipsum magnam dolorem amet nulla saepe!</p>
              </div>
              <div className="h-40 border rounded-lg border-neutral-300 p-5 mb-4">
                <h2 className="text-lg font-bold mb-2">Dang Thai Hoang</h2>
                <p className="line-clamp-3 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam consequatur commodi ea quisquam et delectus obcaecati sed perspiciatis, quae possimus eos quam inventore, temporibus ipsum magnam dolorem amet nulla saepe!</p>
              </div>
            
            </TabsContent>
            <TabsContent value="4">
              <div className="h-40 border rounded-lg border-neutral-300 p-5 mb-4">
                <h2 className="text-lg font-bold mb-2">Dang Thai Hoang</h2>
                <p className="line-clamp-3 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam consequatur commodi ea quisquam et delectus obcaecati sed perspiciatis, quae possimus eos quam inventore, temporibus ipsum magnam dolorem amet nulla saepe!</p>
              </div>
              <div className="h-40 border rounded-lg border-neutral-300 p-5 mb-4">
                <h2 className="text-lg font-bold mb-2">Dang Thai Hoang</h2>
                <p className="line-clamp-3 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam consequatur commodi ea quisquam et delectus obcaecati sed perspiciatis, quae possimus eos quam inventore, temporibus ipsum magnam dolorem amet nulla saepe!</p>
              </div>
              <div className="h-40 border rounded-lg border-neutral-300 p-5 mb-4">
                <h2 className="text-lg font-bold mb-2">Dang Thai Hoang</h2>
                <p className="line-clamp-3 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam consequatur commodi ea quisquam et delectus obcaecati sed perspiciatis, quae possimus eos quam inventore, temporibus ipsum magnam dolorem amet nulla saepe!</p>
              </div>
            </TabsContent>
            <TabsContent value="3">
              <div className="h-40 border rounded-lg border-neutral-300 p-5 mb-4">
                <h2 className="text-lg font-bold mb-2">Dang Thai Hoang</h2>
                <p className="line-clamp-3 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam consequatur commodi ea quisquam et delectus obcaecati sed perspiciatis, quae possimus eos quam inventore, temporibus ipsum magnam dolorem amet nulla saepe!</p>
              </div>
              <div className="h-40 border rounded-lg border-neutral-300 p-5 mb-4">
                <h2 className="text-lg font-bold mb-2">Dang Thai Hoang</h2>
                <p className="line-clamp-3 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam consequatur commodi ea quisquam et delectus obcaecati sed perspiciatis, quae possimus eos quam inventore, temporibus ipsum magnam dolorem amet nulla saepe!</p>
              </div>
            </TabsContent>
            <TabsContent value="2">
              <div className="h-40 border rounded-lg border-neutral-300 p-5 mb-4">
                <h2 className="text-lg font-bold mb-2">Dang Thai Hoang</h2>
                <p className="line-clamp-3 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam consequatur commodi ea quisquam et delectus obcaecati sed perspiciatis, quae possimus eos quam inventore, temporibus ipsum magnam dolorem amet nulla saepe!</p>
              </div>
              <div className="h-40 border rounded-lg border-neutral-300 p-5 mb-4">
                <h2 className="text-lg font-bold mb-2">Dang Thai Hoang</h2>
                <p className="line-clamp-3 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam consequatur commodi ea quisquam et delectus obcaecati sed perspiciatis, quae possimus eos quam inventore, temporibus ipsum magnam dolorem amet nulla saepe!</p>
              </div>
            </TabsContent>
            <TabsContent value="1">
              <div className="h-40 border rounded-lg border-neutral-300 p-5 mb-4">
                <h2 className="text-lg font-bold mb-2">Dang Thai Hoang</h2>
                <p className="line-clamp-3 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam consequatur commodi ea quisquam et delectus obcaecati sed perspiciatis, quae possimus eos quam inventore, temporibus ipsum magnam dolorem amet nulla saepe!</p>
              </div>
              <div className="h-40 border rounded-lg border-neutral-300 p-5 mb-4">
                <h2 className="text-lg font-bold mb-2">Dang Thai Hoang</h2>
                <p className="line-clamp-3 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam consequatur commodi ea quisquam et delectus obcaecati sed perspiciatis, quae possimus eos quam inventore, temporibus ipsum magnam dolorem amet nulla saepe!</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
