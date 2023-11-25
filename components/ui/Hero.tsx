import vnBooksStore from "@/public/vnbooksstore.jpeg";

export default function Hero() {

  return (
    <div style={{backgroundImage: `url(${vnBooksStore.src})`}} className="bg-cover bg-no-repeat bg-center bg-blend-multiply bg-fixed bg-neutral-400">
      <div className="w-full h-full flex py-56">
        <div className="text-white m-auto text-center">
          <h1 className="text-5xl lg:text-9xl">
            <div className="mx-auto relative w-fit block after:block after:content-[''] after:absolute after:h-[5px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-500 after:origin-center">
              BOOK FLOW
            </div>
          </h1>
          <p className="max-w-xs md:max-w-md mt-8 text-sm lg:text-xl mx-auto">THE FIRST EVER BOOKS REVIEW PLATFORM FOR VIETNAMESE PEOPLE 🇻🇳</p>
        </div>
      </div>
    </div>
  );
}
