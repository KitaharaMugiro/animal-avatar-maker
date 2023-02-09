import React, { useEffect, useState } from "react";
import { CloudinaryImageProps } from "../../utils/types";
import imageCompression from 'browser-image-compression';
import Head from 'next/head'
import Image from 'next/image'
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

export default () => {
    const [examples, setExamples] = useState<PromptExample[]>([])

    useEffect(() => {
        // APIを呼び出す
        fetch("/api/prompts/example").then((res) => (res.json())).then((data) => {
            console.log({ data })
            const prompts: PromptExample[] = data.prompts.map(val => {
                return {
                    id: val.id,
                    title: val.title,
                    image: imageUrlFromPath(val.image),
                    prompt: val.prompt.replace("{identifier}", "MY_PET")
                }
            })
            setExamples(prompts)
        })
    }, [])

    const [prompt, setPrompt] = useState("");
    const [placeholder, setPlaceholder] = useState("ここにプロンプトが表示されます");
    const onSelectPrompt = (e: PromptExample) => {
        setPrompt(() => e.prompt)
    }

    const handleMouseEnter = (e) => {
        setPlaceholder(() => e.target.alt)
    }

    const handleMouseLeave = (e) => {
        setPlaceholder(() => "")
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

    return <div >
        <p className="mt-1 flex justify-center px-6">プロンプトを選ぶ①</p>
        <div className="mt-3 flex flex-wrap justify-center bg-slate-100 p-3">
            {examples.map((val) =>
                <div className="m-1" key={val.prompt}>
                    <div className="mx-3 cursor-pointer"
                        onClick={() => onSelectPrompt(val)}
                        onMouseEnter={handleMouseEnter}
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
        <div className="mt-1 flex justify-center">


            <textarea
                value={prompt}
                placeholder={placeholder}
                onChange={(e) => setPrompt(e.target.value)}
                id="message" html-rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

        </div>
    </div>
}