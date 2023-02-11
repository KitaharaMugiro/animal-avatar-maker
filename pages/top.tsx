import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import MyFooter from '../components/common/MyFooter'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import MyHeader from '../components/common/MyHeader'

const Home: NextPage = () => {
  const [id, setId] = useState<string>('')
  const router = useRouter()

  const onSubmit = (e: any) => {
    e.preventDefault()
    if (id === '') return
    router.push(`/${id}`)
  }

  return (
    <>
      <Head>
        <title>アニマルアバターメーカー</title>
      </Head>

      <MyHeader />
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="p-10 border">
          <div className="flex flex-col items-center">
            <p>ユーザIDを設定する</p>
            <form onSubmit={onSubmit} className="w-full max-w-sm">
              <div className="flex items-center border-b border-teal-500 py-2">
                <input
                  onChange={(e) => setId(e.target.value)}
                  value={id}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="英数字でIDを設定してください" aria-label="user id" />

                <a onClick={onSubmit} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
                  <button
                    type="button">
                    アバターを作る
                  </button>
                </a>

              </div>
            </form>
          </div>
        </div>
      </main>
      <MyFooter />
    </>
  )
}

export default Home
