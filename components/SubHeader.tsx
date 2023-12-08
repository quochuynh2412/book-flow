import Link from "next/link";
import TextUnderline from "./TextUnderline";

export default function SubHeader() {
  return (
    <div className="bg-white h-14 flex border-b border-neutral-200 top-0 shadow">
      <div className="m-auto h-full flex gap-8 md:gap-24 lg:gap-48">
        <Link href="#intro" className="flex p-3">
          <div className="text-md md:text-lg my-auto">
            <TextUnderline content="Intro" />
          </div>
        </Link>
        <Link href="#discover" className="flex p-3">
          <div className="text-md md:text-lg my-auto ">
            <TextUnderline content="Discover" />
          </div>
        </Link>
        <Link href="#about" className="flex p-3">
          <div className="text-md md:text-lg my-auto">
            <TextUnderline content="About" />
          </div>
        </Link>
      </div>
    </div>
  );
}
