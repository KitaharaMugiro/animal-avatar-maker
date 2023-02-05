import { ChangeEventHandler, useState } from "react";
import { CloudinaryImageProps } from "../../utils/types";
import imageCompression from 'browser-image-compression';
import Head from 'next/head'
import Image from 'next/image'
// http://localhost:3000/dev/prompt_select にアクセスする
// STEP1: https://www.notion.so/ecf43b7396124d7b86a6745b35fd19a7#e0ec4605e10b4601b4fbb9f2e98473ec のビューを作る
// STEP2: テキストボックスを配置して、そこにフォーカスを当てると、STEP1で作ったビューがポップアップするようにする
// STEP3: STEP1で作ったビューの中の１つをクリックすると、それに対応したプロンプトがテキストボックに入力されるようにする

export default () => {

    return <div >
        <p className="mt-1 flex justify-center px-6">プロンプトを選ぶ</p>
        <div className="mt-1 flex justify-center rounded-md px-6 pt-5 pb-6">
            <div className="mx-3">
                <a href="" className="mx-3">
                    <div><img className="rounded-xl" src="/prompts/prompt_6.png" width={200} height={200} alt="雪だるま" /></div>
                <p className="mt-1 flex justify-center">雪だるま</p>
                </a>
            </div>
            <div className="mx-3">
                <a href="" className="mx-3">
                    <div><img className="rounded-xl" src="/prompts/prompt_2.png" width={200} height={200} alt="油絵" /></div>
                <p className="mt-1 flex justify-center">油絵</p>
                </a>
            </div>
            <div className="mx-3">
                <a href="" className="mx-3">
                    <div><img className="rounded-xl" src="/prompts/prompt_3.png" width={200} height={200} alt="バレンタイン" /></div>
                <p className="mt-1 flex justify-center">バレンタイン</p>
                </a>
            </div>
            <div className="mx-3">
                <a href="" className="mx-3">
                    <div><img className="rounded-xl" src="/prompts/prompt_4.png" width={200} height={200} alt="アニメ風イラスト" /></div>
                <p className="mt-1 flex justify-center">アニメ風イラスト</p>
                </a>
            </div>
            <div className="mx-3">
                <a href="" className="mx-3">
                    <div><img className="rounded-xl" src="/prompts/prompt_5.png" width={200} height={200} alt="アルバム" /></div>
                <p className="mt-1 flex justify-center">アルバム</p>
                </a>
            </div>
        </div>
    </div>
}