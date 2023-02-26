import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { PlanConst } from "../../const/PlanConst"
import { imageUrl } from "../../utils/imageUrl"
import { CloudinaryImageProps } from "../../utils/types"
import MailForm from "../form/MailForm"
import PlanSelector from "../form/PlanSelector"
import PlanTable from "../plan/PlanTable"
import MultiPromptSelectors from "./MultiPromptSelectors"
import Uploader from "./Uploader"

interface Props {
    name: string,
    inputImages: CloudinaryImageProps[]
}

export default (props: Props) => {
    const router = useRouter()
    const isInputUploaded = props.inputImages.length > 0
    const [plan, setPlan] = useState("none")
    const [email, setEmail] = useState("")
    const [prompts, setPrompts] = useState([])
    const isValidEmail = email.match(/.+@.+\..+/) !== null
    const readyToCreate = plan !== "none" && isInputUploaded && isValidEmail
    const prompt_use_num = PlanConst[plan].freeStyePromptNum

    useEffect(() => {
        if (prompts.length < prompt_use_num) {
            //元あったプロンプトは残したい
            const newPrompts = [...Array(prompt_use_num)].map(() => "")
            for (const i in prompts) {
                newPrompts[i] = prompts[i]
            }
            setPrompts(newPrompts)
        }
    }, [plan])

    const onCreate = async () => {
        console.log({ prompts })
        const submitPrompts = prompts.map((prompt) => {
            return prompt.replace("MY_PET", "{identifier}")
        }).slice(0, prompt_use_num)
        console.log({ submitPrompts })
        if (confirm("アバターを作成しますか？")) {
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
                    prompts: submitPrompts
                })
            })
            //リロード
            router.push("/" + props.name + "/status")
        }
    }

    const uploadOrPreviewRender = () => {
        //TODO: isInputUploadedがtrueならば、アップロードした画像を表示する
        if (isInputUploaded) {
            return <div>

                <h2>アップロードいただいた画像</h2>
                <div className="mt-2 grid grid-cols-5 gap-y-2 gap-x-4 sm:grid-cols-8">
                    {props.inputImages.map((file) => (
                        <div key={file.public_id} className="relative group">
                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                                <img src={imageUrl(file.public_id, file.format, false, false)} className="object-cover" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        } else {
            return (
                <>
                    <div className="mt-4">
                        <p className="text-lg">ペットの写真を10枚ほどアップロードしてください</p>
                        <Uploader name={props.name} />
                    </div></>)

        }
    }

    const renderAfterInputImage = () => {
        if (!isInputUploaded) {
            return <div />
        }
        return (<div className="mt-10">

            <div className="mt-4 max-w-xl mx-auto">
                <MailForm email={email} setEmail={setEmail} />
            </div>

            <div className="mt-4 max-w-xl mx-auto">
                <PlanSelector plan={plan} setPlan={setPlan} />
                <PlanTable />
            </div>

            <div className="mt-4">
                <MultiPromptSelectors
                    prompts={prompts}
                    setPrompts={setPrompts}
                    use_num={prompt_use_num} />
            </div>

            {PlanConst[plan].price > 0 && <div className="mx-auto">
                <p className="text-sm">※ お支払いはクレジットカードもしくはPayPayにてお受け付けしております。後ほど支払いリンクをメールにてお送りさせていただきます。</p>
            </div>}

            {readyToCreate ?
                <div className="flex flex-col items-center">
                    <button
                        onClick={onCreate}
                        className="mx-auto my-10 bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-16 rounded-full">
                        アバターを作成する
                    </button>
                </div> :
                <div className="flex flex-col items-center">
                    <button
                        className="mx-auto my-10 bg-gray-500 text-white font-bold py-6 px-16 rounded-full">
                        アバターを作成する
                    </button>
                </div>
            }
        </div>)
    }



    return <div className="bg-gray-50 p-5">
        {uploadOrPreviewRender()}
        {renderAfterInputImage()}
    </div>





}
