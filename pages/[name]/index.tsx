import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import NoAvatar from '../../components/avatar/NoAvatar'
import MyHeader from '../../components/common/MyHeader'
import PhotoGallary from '../../components/gallary/PhotoGallary'
import { getAllImages, getInputImages } from '../../utils/getImages'
import { imageUrl } from '../../utils/imageUrl'
import { CloudinaryImageProps } from '../../utils/types'
import { useLastViewedPhoto } from '../../utils/useLastViewedPhoto'


const Home: NextPage = ({ images, inputImages }: { images: CloudinaryImageProps[], inputImages: CloudinaryImageProps[] }) => {
    const router = useRouter()
    const { name } = router.query

    const onClickKifu = () => {
        //https://buy.stripe.com/6oE7vY8i80x81TG8wy
        window.open('https://buy.stripe.com/6oE7vY8i80x81TG8wy', '_blank')
    }

    const title = `${name}さんのギャラリー | アニマルアバターメーカー`
    let pickedImage = undefined
    if (images.length > 0) {
        pickedImage = imageUrl(images[0].public_id, images[0].format, false, false)
    }
    return (
        <>
            <Head>
                <title>{title}</title>
                {pickedImage && <><meta
                    property="og:image"
                    content={pickedImage}
                />
                    <meta
                        name="twitter:image"
                        content={pickedImage}
                    /></>}
            </Head>
            <MyHeader />
            <PhotoGallary images={images} inputImages={inputImages} />
            <button
                onClick={onClickKifu}
                className="fixed z-90 bottom-10 right-8 text-white px-4 w-auto h-10 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" className="w-6 h-6 inline-block mr-1">
                    <path fill="#FFFFFF" d="M17.19,4.155c-1.672-1.534-4.383-1.534-6.055,0L10,5.197L8.864,4.155c-1.672-1.534-4.382-1.534-6.054,0
                                    c-1.881,1.727-1.881,4.52,0,6.246L10,17l7.19-6.599C19.07,8.675,19.07,5.881,17.19,4.155z"/>
                </svg>
                <span>寄付する</span>
            </button>
        </>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
    //URLからパラメータを取得 
    const { name } = context.params
    const reducedResults = await getAllImages(name as string)

    // 画像がなければリダイレクト
    // TODO: リダイレクトじゃなくてリンクを表示させる形にしたい
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
