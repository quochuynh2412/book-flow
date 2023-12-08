import vietnam from "@/public/vietnam.png";

const stats = [
  { id: 1, name: 'Books', value: '10,000+' },
  { id: 2, name: 'Book reviews', value: '50,000+' },
  { id: 3, name: 'New users annually', value: '5,000+' },
];

export default function Intro() {
  return (
    <div id="intro" className="relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-white">
        <div className="mx-auto max-w-7xl px-12 lg:px-8 py-32">
          <dl className="grid grid-cols-1 gap-x-20 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="order-first font-semibold tracking-tight text-3xl lg:text-6xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div style={{backgroundImage: `url(${vietnam.src})`}} className="bg-cover bg-no-repeat bg-center sticky top-0 h-screen flex flex-col items-center justify-center text-white" >
        <div className="w-full">
            <h1 className="mx-12 mb-10 text-center text-4xl lg:text-6xl">FOCUS ON THE <span className="text-yellow-400 font-bold">VIETNAMESE</span>!</h1>
            <p className="mx-20 text-center text-lg">Built by Vietnamese people, for Vietnamese people.</p>
        </div>
      </div>
    </div>
  );
}
