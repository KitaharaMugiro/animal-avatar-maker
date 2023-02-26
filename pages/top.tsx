import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { useState } from "react"
import MyFooter from "../components/common/MyFooter"
import MyHeader from "../components/common/MyHeader"

const Home: NextPage = () => {
    const [id, setId] = useState<string>("")
    const router = useRouter()

    const onSubmit = (e: any) => {
        e.preventDefault()
        if (id === "") return
        router.push(`/${id}/status`)
    }

    return (
        <>
            <Head>
                <title>アニマルアバターメーカー</title>
            </Head>

            <MyHeader />
            <main className="mx-auto max-w-[1960px] p-4">
                <div className="border p-10">
                    <div className="flex flex-col items-center">
                        <p>Twitter or Instagram IDを入力</p>
                        <form onSubmit={onSubmit} className="w-full max-w-sm">
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input
                                    onChange={(e) => setId(e.target.value)}
                                    value={id}
                                    className="mr-3 w-full appearance-none border-none bg-transparent py-1 px-2 leading-tight text-gray-700 focus:outline-none"
                                    type="text"
                                    placeholder="英数字でIDを設定してください"
                                    aria-label="user id"
                                />

                                <a
                                    onClick={onSubmit}
                                    className="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 py-1 px-2 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
                                >
                                    <button type="button">アバターを作る</button>
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
