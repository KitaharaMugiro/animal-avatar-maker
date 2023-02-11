import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import MyFooter from '../components/common/MyFooter'
import { AvatarHero } from '../components/lp/AvatarHero'
import UchinokoQA from '../components/uchinoko/UchinokoQA'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>アニマルアバターメーカー</title>
      </Head>

      <AvatarHero />
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="flex flex-col items-center">
          <Image className="mx-auto my-4" src="/uchinoko/1.png" alt="うちの子" width={500} height={500} unoptimized />
          <Image className="mx-auto my-4" src="/uchinoko/2.png" alt="うちの子" width={500} height={500} unoptimized />
          <Image className="mx-auto my-4" src="/uchinoko/3.png" alt="うちの子" width={500} height={500} unoptimized />
          <Image className="mx-auto my-4" src="/uchinoko/4.png" alt="うちの子" width={500} height={500} unoptimized />
          <Image className="mx-auto my-4" src="/uchinoko/8.png" alt="うちの子" width={500} height={500} unoptimized />

          <Link href="/top">
            <button

              className="mx-auto my-10 bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-16 rounded-full">
              早速つくってみる
            </button>
          </Link>

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
