import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import MyFooter from "../components/common/MyFooter"
import { AvatarHero } from "../components/lp/AvatarHero"
import { CreateButton } from "../components/lp/CreateButton"
import CampaignQA from "../components/campaign/CampaignQA"

const Home: NextPage = () => {
    const css_button = "rounded-full px-15 text-3xl h-12 flex justify-center bg-gradient-to-r from-orange-200 to-orange-200"
    return (
        <>
            <Head>
                <title>アニマルアバターメーカー</title>
            </Head>

            <main className="mx-auto max-w-[1960px] p-4 bg-rose-50">
            <AvatarHero />
            <CreateButton />
            <div className="md:w-1/2 w-full mx-auto">
                <div>
                    <h1 className={css_button}>うちの子サービス</h1>
                </div>
                <div className="py-5 p-auto container mx-auto">
                    <img className="justify-center" src="https://res.cloudinary.com/ddeqwb08j/image/upload/v1679144773/%E8%A6%8B%E5%87%BA%E3%81%97%E3%82%92%E8%BF%BD%E5%8A%A0_axbkjm.png" alt="" /><br /><br />
                    <img className="justify-center" src="https://res.cloudinary.com/ddeqwb08j/image/upload/v1678624859/2_%E3%83%9A%E3%83%83%E3%83%88%E3%82%B0%E3%83%83%E3%82%BA%E5%88%B6%E4%BD%9C_utf7gx.png" alt="" />
                </div>
            </div>
            <CreateButton />
            <div className="md:w-3/6 w-full mx-auto">
                <h1 className={css_button}>お客様の声</h1>
                <div className="py-5 p-auto container mx-auto">
                    <blockquote><p lang="ja" dir="ltr">オシャレがすぎる<a href="https://twitter.com/hashtag/%E3%82%A2%E3%83%8B%E3%83%9E%E3%83%AB%E3%82%A2%E3%83%90%E3%82%BF%E3%83%BC%E3%83%A1%E3%83%BC%E3%82%AB%E3%83%BC?src=hash&amp;ref_src=twsrc%5Etfw">#アニマルアバターメーカー</a> <a href="https://t.co/uCJlUx10OF">pic.twitter.com/uCJlUx10OF</a></p>&mdash; 希死念慮ちゃん (@kishinenryochan) <a href="https://twitter.com/kishinenryochan/status/1634802053561344000?ref_src=twsrc%5Etfw">March 12, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js"></script>
                    <img className="justify-center w-full" src="https://res.cloudinary.com/ddeqwb08j/image/upload/v1679151423/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2023-03-18_235647_xqt76b.png" alt="" />
                </div>
            </div>
            <CreateButton />
            <CampaignQA />
            </main>
            <MyFooter />
        </>
    )
}

export default Home
