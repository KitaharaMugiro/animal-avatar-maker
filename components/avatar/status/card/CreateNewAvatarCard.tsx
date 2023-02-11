import Image from "next/image"
import { useRouter } from "next/router"
import { imageUrlFromPath } from "../../../../utils/imageUrl"

interface Props {
    name: string
}

export default (props: Props) => {
    //TODO: 本当はできた画像を表示したい
    const router = useRouter()
    const goToCreate = () => {
        const { name } = router.query
        router.push(`/${name}/create`)
    }


    return <div onClick={goToCreate} className="p-10 m-3 w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg hover:bg-gray-100">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">新しくアバターを作る！</h5>
        <p className="font-normal text-gray-700">ここをクリックして新しいアバターを作る</p>
    </div>
}