type ColorVariants = {
  [key: string]: string;
};

export default function TextCrossOver({
  lineWeight = "1",
  duration = "200",
  color,
  children,
  className = '',
  capitalized = false, // Add a capitalized prop
}: {
  lineWeight?: string;
  duration?: string;
  color: string;
  children?: React.ReactNode;
  className?: string;
  capitalized?: boolean; // Declare the capitalized prop
}) {
  const colorVariants: ColorVariants = {
    amber: "after:bg-amber-800",
    green: "after:bg-green-800",
    titleGray: "after:bg-title-gray",
    black: "after:bg-black",
    white: "after:bg-white",
  };

  const selectedColorVariant = colorVariants[color] || colorVariants.black;
  const bottomStyle = capitalized ? 'after:bottom-[50%]' : 'after:bottom-[42.5%]';

  return (
    <span
      className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[${lineWeight}px] ${selectedColorVariant} after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-${duration} after:origin-center ${bottomStyle} ${className}`}
    >
      {children}
    </span>
  );
}
