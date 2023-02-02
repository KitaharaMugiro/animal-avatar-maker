import Head from "next/head"
import { CloudinaryImageProps } from "../../utils/types"
import Uploader from "./Uploader"
import Image from "next/image"
import { imageUrl } from "../../utils/imageUrl"
import PlanSelector from "./PlanSelector"
import { useState } from "react"

interface Props {
    name: string,
    inputImages: CloudinaryImageProps[]
}
export default (props: Props) => {
    const isInputUploaded = props.inputImages.length > 0
    const [plan, setPlan] = useState("none")
    const readyToCreate = plan !== "none" && isInputUploaded

    const onCreate = async () => {
        console.log("confirm")
        if (confirm("アバターを作成しますか？")) {
            //TODO: planやprompt_versionを選択できるようにする
            await fetch('/api/kick_status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: props.name,
                    plan: plan,
                    prompt_version: 4,
                    class_name: "dog"
                })
            })
            //リロード
            window.location.reload()
        }
    }

    const uploadOrPreviewRender = () => {
        //TODO: isInputUploadedがtrueならば、アップロードした画像を表示する
        if (isInputUploaded) {
            return <div className="mt-2 grid grid-cols-5 gap-y-2 gap-x-4 sm:grid-cols-8">
                {props.inputImages.map((file) => (
                    <div key={file.public_id} className="relative group">
                        <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                            <img src={imageUrl(file.public_id, file.format, false, false)} className="object-cover" />
                        </div>
                    </div>
                ))}
            </div>

        } else {
            return (
                <>


                    <div className="mt-4">
                        <p className="text-lg">ペットの写真を10枚ほどアップロードしてください</p>
                        {/* リサイズした画像をアップロードしよう */}
                        <Uploader name={props.name} />
                    </div></>)

        }
    }

    return <div className="bg-gray-50 p-5">
        {/* まずBirmeでリサイズすることを伝える */}
        <div className="text-center">
            <h1 className="text-3xl font-bold">アニマルアバターメーカー</h1>
        </div>

        {uploadOrPreviewRender()}

        {isInputUploaded &&
            <div className="mt-4">
                <p className="text-lg">プランを選ぶ</p>
                <PlanSelector plan={plan} setPlan={setPlan} />
            </div>
        }
        {readyToCreate &&
            <div className="flex flex-col items-center">
                <button
                    onClick={onCreate}
                    className="mx-auto my-10 bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-16 rounded-full">
                    アバターを作成する
                </button>
            </div>
        }

    </div>

}