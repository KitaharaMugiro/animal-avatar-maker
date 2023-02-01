import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GenerateStatus from "../../components/avatar/status/GeneratingStatus";
import NoAvatar from "../../components/avatar/NoAvatar";
import { getInputImages } from "../../utils/getImages";
import { CloudinaryImageProps } from "../../utils/types";
import MyHeader from "../../components/common/MyHeader";
import MyFooter from "../../components/common/MyFooter";

export default ({ inputImages }: { inputImages: CloudinaryImageProps[] }) => {
    const router = useRouter()
    const { name } = router.query


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
        <MyHeader />
        <NoAvatar name={name as string} inputImages={inputImages} />
        <div style={{ height: 200 }} />
        <MyFooter />
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