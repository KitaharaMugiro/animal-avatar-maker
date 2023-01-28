import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next"
import Head from "next/head";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import NoAvatar from "../../components/avatar/NoAvatar"
import { getInputImages } from "../../utils/getImages"
import { CloudinaryImageProps } from "../../utils/types"

export default ({ inputImages }: { inputImages: CloudinaryImageProps[] }) => {
    const router = useRouter()
    const { name } = router.query
    const [status, setStatus] = useState("")
    useEffect(() => {
        //TODO: かなりキモいのでapolloなどを入れたい
        fetch('/api/get_status?user_id=' + name).then(res => res.json()).then(data => {
            if (data.avatar_generate_status && data.avatar_generate_status.length > 0) {
                setStatus(data.avatar_generate_status[0].status)
            }
        })
    }, [])

    const title = `${name}さんのアバターを作る | アニマルアバターメーカー`
    return <>
        <Head>
            <title>{title}</title>
            <meta
                property="og:image"
                content="https://asset.cloudinary.com/ddeqwb08j/3dee328119b5e06a5f76503c0c585214"
            />
            <meta
                name="twitter:image"
                content="https://asset.cloudinary.com/ddeqwb08j/3dee328119b5e06a5f76503c0c585214"
            />
        </Head>
        {status === "waiting" && <div>アバターを作成中です。しばらくお待ちください。</div>}
        {status !== "waiting" &&
            <NoAvatar name={name as string} inputImages={inputImages} />
        }
    </>
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