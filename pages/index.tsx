import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>うちの子イラスト定期便</title>
        <meta
          property="og:image"
          content="https://asset.cloudinary.com/ddeqwb08j/3dee328119b5e06a5f76503c0c585214"
        />
        <meta
          name="twitter:image"
          content="https://asset.cloudinary.com/ddeqwb08j/3dee328119b5e06a5f76503c0c585214"
        />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-medium my-4">うちの子イラスト定期便</h1>
          <Image className="mx-auto my-4" src="/uchinoko/1.png" alt="うちの子" width={500} height={500} unoptimized />
          <Image className="mx-auto my-4" src="/uchinoko/2.png" alt="うちの子" width={500} height={500} unoptimized />
          <Image className="mx-auto my-4" src="/uchinoko/3.png" alt="うちの子" width={500} height={500} unoptimized />
          <Image className="mx-auto my-4" src="/uchinoko/4.png" alt="うちの子" width={500} height={500} unoptimized />
          <Image className="mx-auto my-4" src="/uchinoko/5.png" alt="うちの子" width={500} height={500} unoptimized />
        </div>
      </main>
    </>
  )
}

export default Home
