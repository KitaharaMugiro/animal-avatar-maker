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
    let lists =[
        {avatar:"アニメ風イラスト",image:"/prompts/prompt_4.png",prompt:"{identifier}, beautiful concept art, by makoto shinkai"},
        {avatar:"バレンタイン",image:"/prompts/prompt_3.png",prompt:"{identifier} with heart chocolate, in valentine"},
        {avatar:"雪だるま",image:"/prompts/prompt_6.png",prompt:"{identifier} with snowman in snow day"},
        {avatar:"油絵",image:"/prompts/prompt_2.png",prompt:"neoclassicism {identifier} by Edgar Degas"},
        {avatar:"アルバム",image:"/prompts/prompt_5.png",prompt:"{identifier} with snowman in album in anime style by makoto shinkai"}
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
        <p className="mt-1 flex justify-center px-6"><br />プロンプトを選ぶ</p>
        <div className="mt-1 flex flex-wrap justify-center rounded-md px-6 pt-5 pb-6">
            {lists.map((val) =>
            <div className="mx-3 ">
                <div className="mx-3 cursor-pointer" onClick={addText} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} data-prompt={val.prompt}>
                <div className="w-1/1"><img className="rounded-xl hover:shadow-2xl" src={val.image} width={200} height={200} alt={val.prompt} />
                    <p className="mt-1 flex justify-center">{val.avatar}</p></div>
                </div>
            </div>
            )}
            
        </div>
        <div className="mt-1 flex justify-center">
            <textarea className="focus:shadow-soft-primary-outline min-h-unset text-sm leading-5.6 ease-soft block appearance-none rounded-lg border divide-x border-4 border-purple-300 bg-white bg-clip-padding px-10 py-10 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" name="" id="" placeholder={placeholder} value={state} />
        </div><br /><br />
    </div>
}