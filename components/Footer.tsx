import Image from "next/image";
import Link from "next/link";
import TextCrossOver from "./TextCrossOver";
export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t-2 font-serif">
      <div className="w-full mx-auto py-12">
        <div className="flex flex-wrap md:gap-6">
          <div className="basis-full flex">
            <Link href="" className="mx-auto flex items-center mb-4 space-x-3 rtl:space-x-reverse">
              <Image src={'/img/bookflowlogo.png'} alt="Book" width={50} height={50} className="h-12 w-12 mb-2"></Image>
              <span className="text-2xl whitespace-nowrap dark:text-white">bookflow</span>
            </Link>
          </div>
          <ul className="mx-auto text-center md:flex gap-24 items-center font-medium text-gray-500 dark:text-gray-400">
            <li className="my-2">
              <Link href="#">
                <TextCrossOver color="titleGray">About</TextCrossOver>
              </Link>
            </li>
            <li className="my-2">
              <Link href="#"><TextCrossOver color="titleGray">Privacy Policy</TextCrossOver></Link>
            </li>
            <li className="my-2">
              <Link href="#"><TextCrossOver color="titleGray">Licensing</TextCrossOver></Link>
            </li>
            <li className="my-2">
              <Link href="#"><TextCrossOver color="titleGray">Contact</TextCrossOver></Link>
            </li>
          </ul>
        </div>
        <hr className="my-12 border-gray-200 sm:mx-auto dark:border-gray-700" />
        <span className="block text-sm text-gray-500 text-center dark:text-gray-400">© 2023 <Link href="" className="hover:underline">Book Flow</Link>. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
