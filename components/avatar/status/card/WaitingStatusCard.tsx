import Image from "next/image"
import { useRouter } from "next/router"

interface Props {
    date: string
    rank: number
    waiting: number
    plan: string
    isGenerating: boolean
    isWaiting: boolean
}

export default (props: Props) => {
    const image = "/prompts/generating.png"
    const router = useRouter()
    const goToGallery = () => {
        const { name } = router.query
        router.push(`/${name}`)
    }

    const renderButton = () => {
        if (props.isGenerating) return <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
            <button onClick={goToGallery} className="text-sm">作成中の画像を見る</button>
        </div>
        else return <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>

            <button className="text-sm">スピードアップ</button>
        </div>
    }

    const statusText = () => {
        if (props.isGenerating) return "現在画像作成中"
        else if (props.isWaiting) return `作成待ち(${props.rank}人目/${props.waiting}人待ち)`
        else return `学習中`
    }

    return <div className="m-3 w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <Image unoptimized className="object-cover w-full h-56" src={image} width={500} height={500} alt="avatar" />

        <div className="py-5 text-center">
            <a href="#" className="block text-xl font-bold text-gray-800 dark:text-white" html-tabindex="0" role="link">{props.date}</a>
            <span className="text-sm text-gray-700 dark:text-gray-200">{statusText()}</span>
        </div>

        <div className="mt-3 flex items-end justify-between p-3">
            <p>
                <span className="text-lg font-bold text-blue-500">{props.plan}</span>
            </p>


            {renderButton()}


        </div>
    </div>
}