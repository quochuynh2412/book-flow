export default function footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t-2">
      <div className="w-full mx-auto py-12">
        <div className="flex flex-wrap md:gap-6">
          <div className="basis-full flex">
            <a href="" className="mx-auto flex items-center mb-4 space-x-3 rtl:space-x-reverse">
              <svg xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 384 512">
                <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"/>
              </svg>
              <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">Book Flow</span>
            </a>
          </div>
          <ul className="mx-auto text-center md:flex gap-24 items-center font-medium text-gray-500 dark:text-gray-400">
            <li className="my-2">
              <a href="#" className="hover:underline">About</a>
            </li>
            <li className="my-2">
              <a href="#" className="hover:underline">Privacy Policy</a>
            </li>
            <li className="my-2">
              <a href="#" className="hover:underline">Licensing</a>
            </li>
            <li className="my-2">
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-12 border-gray-200 sm:mx-auto dark:border-gray-700" />
        <span className="block text-sm text-gray-500 text-center dark:text-gray-400">© 2023 <a href="" className="hover:underline">Book Flow</a>. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
