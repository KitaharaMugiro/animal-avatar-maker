import React, { useEffect, useState } from "react";
import { CloudinaryImageProps } from "../../utils/types";
import imageCompression from 'browser-image-compression';
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from "next/router"
import { imageUrlFromPath, thumbailImageUrl } from "../../utils/imageUrl";
// http://localhost:3000/dev/prompt_select にアクセスする
// STEP1: APIからプロンプトの例を取得する (実装済み)
// /api/prompts/exampleから取得
// STEP2: {identifier}をMY_PETに置き換えて表示させる (実装済み)
// STEP3: 画像はCloudinaryにあるので、Cloudinaryの画像を表示させる (実装済み)
// STEP4: プロンプトを編集することができるが、MY_PETが入っていないとエラー表示をする
// https://flowbite.com/docs/forms/input-field/#validation のような形で赤くする
// STEP5: このファイルを一つのコンポートネントにする。そして２つ並べる。
// STEP6: 有料プランの時は10個並べる
// STEP7: 送信ボタンを押してプロンプトをサーバに送る(onSubmitメソッドをAPI実装済みなのでこれを参考にして複数のプロンプトを送る)

type PromptExample = {
    id: string
    title: string
    image: string
    prompt: string
}

export default function ShowPrompts() {
    const [examples, setExamples] = useState<PromptExample[]>([])
    const router = useRouter()
    const { name, plan } = router.query

    useEffect(() => {
        // APIを呼び出す
        fetch("/api/prompts/example").then((res) => (res.json())).then((data) => {
            console.log({ data })
            const prompts: PromptExample[] = data.prompts.map(val => {
                return {
                    id: val.id,
                    title: val.title,
                    image: imageUrlFromPath(val.example_image),
                    prompt: val.prompt.replace("{identifier}", "MY_PET")
                }
            })
            setExamples(prompts)
        })
    }, [])

    const [prompt, setPrompt] = useState("");
    const [placeholder, setPlaceholder] = useState("ここにプロンプトが表示されます");
    const onSelectPrompt = (e: PromptExample) => {
        setPrompt(e.prompt)
        hasValue(e.prompt)
    }

    const handleMouseEnter = (e: PromptExample) => {
        setPlaceholder(() => e.prompt)
    }

    const handleMouseLeave = () => {
        setPlaceholder(() => "ここにプロンプトが表示されます")
    }

    const onSubmit = () => {
        const data = {
            user_id: "test",
            class_name: "dog",
            prompts: [prompt]
        }
        fetch("/api/status/start", {
            method: "POST",
            body: JSON.stringify(data)
        }).then((res) => (res.json())).then((data) => {
            console.log({ data })
        })
    }
    const [textError, setTextError] = useState('')
    const green_css = "bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
    const red_css = "bg-red-50 border border-red-500 text-red-900 dark:text-grredeen-400 placeholder-red-700 dark:placeholder-red-500 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-red-500"
    const [color, setColor] = useState(green_css)
    const hasValue = (prompt: string) => {
        if (prompt.match('MY_PET')) {
          setTextError('')
          setColor(green_css)
        } else {
            setTextError('MY_PETの文字を入れてください')
            setColor(red_css)
        }
    }
    const ShowPrompt = () => {
        return <div>
            <p className="mt-1 flex justify-center px-6">プロンプトを選ぶ</p>
            <div className="mt-3 flex flex-wrap justify-center bg-slate-100 p-3">
                {examples.map((val) =>
                    <div className="m-1" key={val.prompt}>
                        <div className="mx-3 cursor-pointer"
                            onClick={() => onSelectPrompt(val)}
                            onMouseEnter={() => handleMouseEnter(val)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="w-1/1">
                                <img className="rounded-xl hover:shadow-2xl"
                                    src={val.image} width={100} height={100}
                                    alt={val.title} />
                                <p className="mt-1 flex justify-center">{val.title}</p></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        }
    const ShowTextarea = () => {
        return <div>
            <div className="mt-1 flex justify-center">
                <textarea
                    value={prompt}
                    placeholder={placeholder}
                    onBlur={(e) => hasValue(e.target.value)}
                    onChange={(e) => setPrompt(e.target.value)}
                    id="prompt" html-rows="4"
                    className={color}>
                </textarea>
            </div>
            {textError &&<p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{textError}</span></p>}
        </div>
        }
        

    return <div >
        <ShowPrompt />
        <ShowTextarea />
    </div>
}