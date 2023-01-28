import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import NoAvatar from '../../components/avatar/NoAvatar'
import PhotoGallary from '../../components/gallary/PhotoGallary'
import { getAllImages, getInputImages } from '../../utils/getImages'
import { CloudinaryImageProps } from '../../utils/types'
import { useLastViewedPhoto } from '../../utils/useLastViewedPhoto'


const Home: NextPage = ({ images, inputImages }: { images: CloudinaryImageProps[], inputImages: CloudinaryImageProps[] }) => {
    const router = useRouter()
    const { name } = router.query

    const title = `${name}さんのギャラリー | アニマルアバターメーカー`
    return (
        <>
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
            <PhotoGallary images={images} inputImages={inputImages} />
        </>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
    //URLからパラメータを取得 
    const { name } = context.params
    const reducedResults = await getAllImages(name as string)

    // 画像がなければリダイレクト
    if (reducedResults.length === 0) {
        return {
            redirect: {
                permanent: false, // 永続的なリダイレクトかどうか
                destination: '/' + name + "/create", // リダイレクト先
            },
        }
    }
    const inputResults = await getInputImages(name as string)
    return {
        props: {
            images: reducedResults,
            inputImages: inputResults,
        },
        revalidate: 60,
    }
}


export const getStaticPaths: GetStaticPaths = async () => {
    //全てのフォルダを取得
    return {
        paths: [],
        fallback: 'blocking',
    }
}
