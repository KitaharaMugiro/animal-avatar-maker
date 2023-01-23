import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MyFooter from '../components/common/MyFooter'
import { Hero } from '../components/uchinoko/Hero'
import UchinokoQA from '../components/uchinoko/UchinokoQA'

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

      <Hero />
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="flex flex-col items-center">
          <Image className="mx-auto my-4" src="/uchinoko/1.png" alt="うちの子" width={500} height={500} unoptimized />
          <Image className="mx-auto my-4" src="/uchinoko/2.png" alt="うちの子" width={500} height={500} unoptimized />
          <Image className="mx-auto my-4" src="/uchinoko/3.png" alt="うちの子" width={500} height={500} unoptimized />
          <Image className="mx-auto my-4" src="/uchinoko/4.png" alt="うちの子" width={500} height={500} unoptimized />
          <Image className="mx-auto my-4" src="/uchinoko/8.png" alt="うちの子" width={500} height={500} unoptimized />
          <button
            onClick={() => window.open('https://buy.stripe.com/bIYbMedCs6Vwcyk4gn?prefilled_promo_code=OPEN')}
            className="mx-auto my-10 bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-16 rounded-full">
            さっそく申し込む <s>￥2,000</s>￥500
          </button>
        </div>

        <UchinokoQA />


      </main>
      <MyFooter />
    </>
  )
}

export default Home
