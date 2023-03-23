import { GetServerSideProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import NoAvatar from "../../components/avatar/AvatarGenerateWithPlanSelection"
import { getInputImages } from "../../utils/getImages"
import { CloudinaryImageProps } from "../../utils/types"
import MyHeader from "../../components/common/MyHeader"
import MyFooter from "../../components/common/MyFooter"

//このページはいずれ消して、createディレクトリに移動させる
export default ({ inputImages }: { inputImages: CloudinaryImageProps[] }) => {
    const router = useRouter()
    const { name } = router.query

    useEffect(() => {
        if (!name) return
        fetch("/api/status/confirm_latest?user_id=" + name)
            .then((res) => res.json())
            .then((data) => {
                //まだ完了でないならステータスページに飛ばす
                console.log("なぜかリダイレクトする")
                console.log({ data })
                if (data.status && data.status !== "generated" && data.status !== "complete") {
                    router.push("/" + name + "/status")
                }
            })
    }, [name])

    const title = `${name}さんのアバターを作る | アニマルアバターメーカー`
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <MyHeader />
            <NoAvatar name={name as string} inputImages={inputImages} imageClass="cat" />
            <div style={{ height: 200 }} />
            <MyFooter />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    //URLからパラメータを取得
    const { name } = context.params
    const inputResults = await getInputImages(name as string)
    return {
        props: {
            inputImages: inputResults,
        },
    }
}
