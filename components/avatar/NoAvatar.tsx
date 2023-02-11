import Head from "next/head"
import { CloudinaryImageProps } from "../../utils/types"
import Uploader from "./Uploader"
import Image from "next/image"
import { imageUrl } from "../../utils/imageUrl"
import PlanSelector from "../form/PlanSelector"
import { useState } from "react"
import { useRouter } from "next/router"
import MailForm from "../form/MailForm"
import PlanTable from "../plan/PlanTable"

interface Props {
    name: string,
    inputImages: CloudinaryImageProps[]
}
export default (props: Props) => {
    const router = useRouter()
    const isInputUploaded = props.inputImages.length > 0
    const [plan, setPlan] = useState("none")
    const [email, setEmail] = useState("")
    const isValidEmail = email.match(/.+@.+\..+/) !== null
    const readyToCreate = plan !== "none" && isInputUploaded && isValidEmail

    const onCreate = async () => {
        console.log("confirm")
        if (confirm("アバターを作成しますか？")) {
            //TODO: planやprompt_versionを選択できるようにする
            await fetch('/api/status/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: props.name,
                    plan: plan,
                    email: email,
                    class_name: "dog",
                    prompts: [
                        "{identifier}, painting by Leonid Afremov",
                        "watercolor {identifier} by John William Waterhouse",
                        "oil painting of {identifier} in style of van gogh",
                        "portrait of {identifier}, vibrant dynamic portrait by makoto shinkai",
                        "Sketch of ({identifier}) by glen keane"
                    ]
                })
            })
            //リロード
            router.push("/" + props.name + "/status")
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

        {uploadOrPreviewRender()}

        {isInputUploaded &&
            <div className="mt-4">
                <PlanSelector plan={plan} setPlan={setPlan} />
                <PlanTable />
            </div>
        }
        {isInputUploaded &&
            <div className="mt-4">
                <MailForm email={email} setEmail={setEmail} />
            </div>
        }
        {plan === "standard" && <div>
            <p className="text-sm">※ お支払いはクレジットカードにてお受け付けしております。後ほど支払いリンクをメールにてお送りさせていただきます。</p>
        </div>}
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

