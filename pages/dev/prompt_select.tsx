import React, { useEffect, useState } from "react";
import { CloudinaryImageProps } from "../../utils/types";
import imageCompression from 'browser-image-compression';
import Head from 'next/head'
import Image from 'next/image'
import { imageUrlFromPath, thumbailImageUrl } from "../../utils/imageUrl";
import ShowPrompts from "../../components/avatar/ShowPrompts";
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
    return <div >
        <ShowPrompts />
        <ShowPrompts />
    </div>
}