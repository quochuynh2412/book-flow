export default function ReviewBar({text, percent} : {text: string, percent: string}) {

  return (
    <div className="flex items-center mt-4">
      <p className="text-sm font-medium w-[40px] text-gray-500">{text}</p>
      <div className="flex-1 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
        <div className="h-5 bg-yellow-400 rounded" style={{ width: percent }} ></div>
      </div>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-[40px]">
        {percent}
      </span>
    </div>
  );
}