export default function TextCrossOver({ lineWeight = "1", duration = "200", color = "black", children }
  : { lineWeight?: string, duration?: string, color?: string, children?: React.ReactNode }) {

  return (
    <span className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[${lineWeight}px] after:bg-${color} after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-${duration} after:origin-center after:bottom-[42.5%]`} >
      {children}
    </span>
  );
}

