export default function TextUnderline({content, weight="1px", duration="200"} 
    : {content: string, weight?: string, duration?: string}) {

  return (
    <span className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[${weight}] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-${duration} after:origin-center`}>
    {/* <span className="relative w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-200 after:origin-center"> */}
      {content}
    </span>
  );
}

