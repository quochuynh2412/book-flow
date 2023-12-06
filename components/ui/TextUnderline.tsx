export default function TextUnderline({content, lineWeight="1", duration="200", color="black"} 
    : {content: string, lineWeight?: string, duration?: string, color?: string}) {

  return (
    <span className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[${lineWeight}px] after:bg-${color} after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-${duration} after:origin-center`}>
    {/* <span className="relative w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-200 after:origin-center"> */}
      {content}
    </span>
  );
}

