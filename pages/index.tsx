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
        <title>うちの子イラスト定期便 Presented By アニマルアバターメーカー</title>
        <meta property="og:image" content="https://res.cloudinary.com/ddeqwb08j/image/upload/v1674475269/1_cn9s39.png" />

        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/ddeqwb08j/image/upload/v1674475269/1_cn9s39.png"
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
            onClick={() => window.open('https://buy.stripe.com/bIYbMedCs6Vwcyk4gn')}
            className="mx-auto my-10 bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-16 rounded-full">
            さっそく申し込む ￥2,000
          </button>
        </div>

        <UchinokoQA />

        {/* お客様の声 */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mt-20">お客様の声</h2>
          <div className="flex flex-col items-center">
            <Image className="mx-auto my-4" src="/uchinoko/koe.png" alt="うちの子" width={500} height={500} unoptimized />
            <Image className="mx-auto my-4" src="/uchinoko/koe2.png" alt="うちの子" width={500} height={500} unoptimized />
          </div>
        </div>


      </main>
      <MyFooter />
    </>
  )
}

export default Home
