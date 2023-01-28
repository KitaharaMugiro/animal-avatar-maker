import Head from "next/head"
import { CloudinaryImageProps } from "../../utils/types"
import PromptSelector from "./PromptSelector"
import Uploader from "./Uploader"

interface Props {
    name: string,
    inputImages: CloudinaryImageProps[]
}
export default (props: Props) => {
    //TODO : ステータスを確認してwaitingであればその旨を表示する
    const isInputUploaded = props.inputImages.length > 0

    const onCreate = () => {
        if (confirm("アバターを作成しますか？")) {
            //TODO: planやprompt_versionを選択できる
            fetch('/api/kick_status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: props.name,
                    plan: "otameshi",
                    prompt_version: 3,
                    class_name: "dog"
                })
            })
        }

    }
    //TODO: isInputUploadedがtrueならば、アップロードした画像を表示する
    return <div className="bg-gray-50">
        {/* まずBirmeでリサイズすることを伝える */}
        <div className="text-center">
            <h1 className="text-3xl font-bold">アニマルアバターメーカー</h1>
            <p className="text-xl">ペットの写真を10~15枚アップロードしてください</p>
        </div>

        <div className="mt-4">
            <p className="text-lg">STEP1: Birmeにアクセスして、画像を512×512にリサイズします。</p>
            <a href="https://www.birme.net/?target_width=512&target_height=512" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">https://www.birme.net/</a>
        </div>

        <div className="mt-4">
            <p className="text-lg">STEP2: リサイズした画像をアップロードします</p>
            {/* リサイズした画像をアップロードしよう */}
            <Uploader name={props.name} />
        </div>

        <div className="mt-4">
            <p className="text-lg">STEP3: プロンプトを選ぶ</p>
            {/* リサイズした画像をアップロードしよう */}
            <PromptSelector />
        </div>

        <div className="flex flex-col items-center">
            <button
                onClick={onCreate}
                className="mx-auto my-10 bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-16 rounded-full">
                アバターを作成する
            </button>
        </div>
    </div>

}