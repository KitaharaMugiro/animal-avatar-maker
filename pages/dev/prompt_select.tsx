import React, { useState } from "react";
import { CloudinaryImageProps } from "../../utils/types";
import imageCompression from 'browser-image-compression';
import Head from 'next/head'
import Image from 'next/image'
// http://localhost:3000/dev/prompt_select にアクセスする
// STEP1: https://www.notion.so/ecf43b7396124d7b86a6745b35fd19a7#e0ec4605e10b4601b4fbb9f2e98473ec のビューを作る
// STEP2: テキストボックスを配置して、そこにフォーカスを当てると、STEP1で作ったビューがポップアップするようにする
// STEP3: STEP1で作ったビューの中の１つをクリックすると、それに対応したプロンプトがテキストボックに入力されるようにする

export default () => {
    let lists = [
        { avatar: "アニメ風イラスト", image: "/prompts/prompt_4.png", prompt: "{identifier}, beautiful concept art, by makoto shinkai" },
        { avatar: "バレンタイン", image: "/prompts/prompt_3.png", prompt: "{identifier} with heart chocolate, in valentine" },
        { avatar: "雪だるま", image: "/prompts/prompt_6.png", prompt: "{identifier} with snowman in snow day" },
        { avatar: "油絵", image: "/prompts/prompt_2.png", prompt: "neoclassicism {identifier} by Edgar Degas" },
        { avatar: "アルバム", image: "/prompts/prompt_5.png", prompt: "{identifier} with snowman in album in anime style by makoto shinkai" }
    ]
    const [state, setState] = useState("");
    const [placeholder, setPlaceholder] = useState("ここにプロンプトが表示されます");
    const addText = (e) => {
        console.log(1)
        console.log(e.target.getAttribute('data-prompt'))
        setState(() => e.target.alt)
    }

    const handleMouseEnter = (e) => {
        setPlaceholder(() => e.target.alt)
    }

    const handleMouseLeave = (e) => {
        setPlaceholder(() => "")
    }

    return <div >
        <p className="mt-1 flex justify-center px-6">プロンプトを選ぶ①</p>
        <div className="mt-3 flex flex-wrap justify-center bg-slate-100 p-3">
            {lists.map((val) =>
                <div className="m-1" key={val.prompt}>
                    <div className="mx-3 cursor-pointer" onClick={addText} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} data-prompt={val.prompt}>
                        <div className="w-1/1">
                            <img className="rounded-xl hover:shadow-2xl"
                                src={val.image} width={100} height={100} alt={val.prompt} />
                            <p className="mt-1 flex justify-center">{val.avatar}</p></div>
                    </div>
                </div>
            )}

        </div>
        <div className="mt-1 flex justify-center">


            <textarea
                value={state}
                placeholder={placeholder}
                onChange={(e) => setState(e.target.value)}
                id="message" html-rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

        </div>
    </div>
}