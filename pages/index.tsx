import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import MyFooter from "../components/common/MyFooter"
import { AvatarHero } from "../components/lp/AvatarHero"

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>アニマルアバターメーカー</title>
            </Head>

            <AvatarHero />
            <main className="mx-auto max-w-[1960px] p-4">
                <div className="flex flex-col items-center">
                    <Link href="/top">
                        <button className="mx-auto my-10 rounded-full bg-red-500 py-6 px-16 font-bold text-white hover:bg-red-700">
                            早速つくってみる
                        </button>
                    </Link>
                </div>
            </main>
            <MyFooter />
        </>
    )
}

export default Home
