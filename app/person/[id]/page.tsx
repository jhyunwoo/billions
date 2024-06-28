import Image from 'next/image'

interface Person {
  id: string
  state: string
  city: string
  name: string
  country: string
  position: number
  industries: string[]
  financialAssets: {
    exchange: string
    ticker: string
    companyName: string
    numberOfShares: number
    sharePrice: number
    currencyCode: string
    exchangeRete: number
    interactive: boolean
    currentPrice: number
  }[]
  thumbnail: string
  squareImage: string
  bio: string[]
  about: string[]
  netWorth: number
}

export default async function PersonDetailPage({ params }: { params: { id: string } }) {
  const person = await fetch(`https://billions-api.nomadcoders.workers.dev/person/${params.id}`)
  const personData: Person = await person.json()

  return (
    <div className={'w-full min-h-screen px-4 pb-4 flex flex-col items-center'}>
      <div className={'w-full max-w-6xl'}>
        {personData.squareImage !== 'https:undefined' ? (
          <Image
            src={personData.squareImage}
            alt={personData.name}
            width={320}
            height={320}
            className={'rounded-lg mb-4'}
          />
        ) : (
          <div
            className={
              'w-full aspect-1 bg-slate-300 max-w-lg mb-4 flex items-center justify-center'
            }
          >
            <div className={'text-4xl font-bold'}>No Image</div>
          </div>
        )}
        <div className={'text-2xl font-bold'}>{personData.name}</div>
        <div>
          <div>Net Worth: {Math.round(Number(personData?.netWorth) / 1000)} Billion</div>
          <div>Country: {personData?.country}</div>
          <div>State: {personData?.state}</div>
          <div>City: {personData?.city}</div>
          <div className={'flex space-x-1'}>
            Industries:
            {personData?.industries?.map((data, index) => <div key={index}> {data}</div>)}
          </div>
          <div className={'mt-4'}>
            <div className={'text-lg font-semibold'}>Bio</div>
            {personData?.bio?.map((data, index) => <div key={index}>{data}</div>)}
          </div>
          <div className={'mt-4'}>
            <div className={'text-lg font-semibold'}>Financial Assets</div>
            <div
              className={
                'w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1'
              }
            >
              {personData?.financialAssets?.map((data, index) => (
                <div key={index} className={'p-2 rounded-lg bg-slate-100'}>
                  <div className={'text-lg font-semibold'}>{data.companyName}</div>
                  <div>Exchange: {data.exchange}</div>
                  <div>Ticker: {data.ticker}</div>
                  <div>Number of Shares: {data.numberOfShares}</div>
                  <div>Currency Code: {data.currencyCode}</div>
                  <div>Exchange Rate: {data.exchangeRete}</div>
                  <div>Interactive: {data.interactive}</div>
                  <div>Current Price: {data.currentPrice}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const billions = await fetch('https://billions-api.nomadcoders.workers.dev')
  const billionsData = await billions.json()
  const billionsList: string[] = []
  for (const data of billionsData) {
    billionsList.push(data.id)
  }
  return billionsList
}
