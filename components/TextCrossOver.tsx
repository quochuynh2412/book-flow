type ColorVariants = {
  [key: string]: string;
};

export default function TextCrossOver({
  lineWeight = "1",
  duration = "200",
  color,
  children
}: {
  lineWeight?: string;
  duration?: string;
  color: string;
  children?: React.ReactNode;
}) {
  const colorVariants: ColorVariants = {
    amber: "after:bg-amber-800",
    green: "after:bg-green-800",
    titleGray: "after:bg-title-gray",
    black: "after:bg-black",
    white: "after:bg-white",
  };

  const selectedColorVariant = colorVariants[color] || colorVariants.black;

  return (
    <span
      className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[${lineWeight}px] ${selectedColorVariant} after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-${duration} after:origin-center after:bottom-[42.5%]`}
    >
      {children}
    </span>
  );
}
