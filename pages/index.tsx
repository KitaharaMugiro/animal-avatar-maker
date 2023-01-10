import type { NextPage } from 'next'
import Head from 'next/head'
import type { ImageProps } from '../utils/types'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>アニマルアバターメーカー</title>
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
        test
      </main>

    </>
  )
}

export default Home
