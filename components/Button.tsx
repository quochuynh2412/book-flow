export default function Button({ content }: { content: string }) {
  return (
    <button className="mx-auto text-neutral-600 bg-neutral-50 p-3 text-md rounded-xl border-2 hover:bg-neutral-100 active:bg-neutral-200 shadow-md active:shadow-none font-semibold border-neutral-300">
      {content}
    </button>
  );
}
