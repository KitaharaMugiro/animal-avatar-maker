import Image from "next/image"
import { useRouter } from "next/router"
import { imageUrlFromPath } from "../../../../utils/imageUrl"

interface Props {
    date: string
    dateText: string
    name: string
    plan: string
}

export default (props: Props) => {
    //TODO: 本当はできた画像を表示したい
    const image = "/prompts/generated.png"
    const router = useRouter()
    const goToGallery = () => {
        const { name } = router.query
        router.push(`/${name}`)
    }

    const renderButton = () => {
        return <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
            <button onClick={goToGallery} className="text-sm">画像を見る</button>
        </div>

    }

    return <div className="m-3 w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg">
        <Image unoptimized className="object-cover w-full h-56" src={image} width={500} height={500} alt="avatar" />

        <div className="py-5 text-center">
            <a href="#" className="block text-xl font-bold text-gray-800" html-tabindex="0" role="link">{props.date}</a>
            <span className="text-sm text-gray-700">作成完了</span>
        </div>

        <div className="mt-3 flex items-end justify-between p-3">
            <p>
                <span className="text-lg font-bold text-blue-500">{props.plan}</span>
            </p>


            {renderButton()}


        </div>
    </div>
}