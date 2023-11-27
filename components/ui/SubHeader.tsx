import Link from "next/link";
import TextUnderline from "./TextUnderline";

export default function SubHeader() {

  return (
    <div className="bg-white h-14 flex border-b border-neutral-200 top-0 shadow">
      <div className="m-auto h-full flex gap-8 md:gap-24 lg:gap-48">
        <Link href="" className="flex p-3">
          <div className="text-md md:text-lg my-auto">
            <TextUnderline content="We Love"/>
          </div>
        </Link>
        <Link href="" className="flex p-3">
          <div className="text-md md:text-lg my-auto ">
            <TextUnderline content="Trending"/>
          </div>
        </Link>
        <Link href="" className="flex p-3">
          <div className="text-md md:text-lg my-auto">
            <TextUnderline content="Discover"/>
          </div>
        </Link>
      </div>
    </div>
  );
}
