import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { CloudinaryImageProps } from "../../utils/types"
import AvatarGenerateForFreeCampaign from "../avatar/AvatarGenerateForFreeCampaign"
import MyFooter from "../common/MyFooter"
import MyHeader from "../common/MyHeader"

export const FreeCampaignCreatePage = ({ inputImages }: { inputImages: CloudinaryImageProps[] }) => {
    const router = useRouter()
    const { name, species } = router.query
    const _species = species ? species : "dog"

    useEffect(() => {
        if (!name) return
        fetch("/api/status/confirm_latest?user_id=" + name)
            .then((res) => res.json())
            .then((data) => {
                //まだ完了でないならステータスページに飛ばす
                console.log("なぜかリダイレクトする")
                console.log({ data })
                // null -> そのまま
                // generated, complete -> そのまま
                // waiting, preparing, ... -> redirect
                //WARN: データ構造がキモい
                if (
                    data.status.status == "waiting" ||
                    data.status.status == "preparing" ||
                    data.status.status == "learning" ||
                    data.status.status == "generating"
                ) {
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
            <AvatarGenerateForFreeCampaign
                species={_species as string}
                name={name as string}
                inputImages={inputImages}
            />
            <div style={{ height: 200 }} />
            <MyFooter />
        </>
    )
}
