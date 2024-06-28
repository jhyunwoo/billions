import Image from 'next/image'
import Link from 'next/link'

export default async function HomePage() {
  const billions = await fetch('https://billions-api.nomadcoders.workers.dev')
  const billionsData = await billions.json()

  return (
    <div className={'w-full min-h-screen flex flex-col px-4 items-center'}>
      <div
        className={
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 w-full max-w-7xl'
        }
      >
        {billionsData.map((data: any) => (
          <Link
            href={`/person/${data.id}`}
            key={data.id}
            className={'bg-gray-50 hover:scale-105 transition rounded-lg hover:shadow-xl'}
          >
            {data.squareImage !== 'https:undefined' ? (
              <Image
                src={data.squareImage}
                alt={data.name}
                width={240}
                height={240}
                className={'rounded-t-lg w-full'}
              />
            ) : (
              <div
                className={
                  'w-full aspect-1 bg-gray-300 rounded-t-lg flex items-center justify-center'
                }
              >
                <div className={'text-xl font-bold text-gray-800'}>No Image</div>
              </div>
            )}
            <div className={'text-lg font-semibold px-2 break-words pt-2'}>{data.name}</div>
            <div className={'flex space-x-2 text-gray-800 px-2 pb-2'}>
              <div>{Math.round(Number(data.netWorth) / 1000)} Billion</div>
              <div>|</div>
              <div>
                {data.industries.map((industry: any, index: number) => (
                  <div key={index}>{industry}</div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
