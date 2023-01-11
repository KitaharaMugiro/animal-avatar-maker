import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Modal from '../../../components/Modal'
import cloudinary from '../../../utils/cloudinary'
import getBase64ImageUrl from '../../../utils/generateBlurPlaceholder'
import { imageUrl } from '../../../utils/imageUrl'
import { ImageProps } from '../../../utils/types'
import { useLastViewedPhoto } from '../../../utils/useLastViewedPhoto'


const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
    const router = useRouter()
    const { photoId, name, date } = router.query
    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

    const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
        if (lastViewedPhoto && !photoId) {
            lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
            setLastViewedPhoto(null)
        }
    }, [photoId, lastViewedPhoto, setLastViewedPhoto])

    const randomPickedImage = images[Math.floor(Math.random() * images.length)]
    const year = date?.toString().slice(0, 4)
    const month = date?.toString().slice(4, 6)

    return (
        <>
            <Head>
                <title>{name}さんのアバター {date}</title>
                <meta
                    property="og:image"
                    content="https://asset.cloudinary.com/ddeqwb08j/3dee328119b5e06a5f76503c0c585214"
                />
                <meta
                    name="twitter:image"
                    content="https://asset.cloudinary.com/ddeqwb08j/3dee328119b5e06a5f76503c0c585214"
                />
            </Head>
            <main className="mx-auto max-w-[1960px] p-4">
                {/* ヘッダー */}

                {/* モーダル */}
                {photoId && (
                    <Modal
                        images={images}
                        onClose={() => {
                            setLastViewedPhoto(photoId)
                        }}
                    />
                )}
                <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                    <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">

                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            {/* ランダムに一枚の画像を表示。丸にする */}
                            {randomPickedImage && (
                                <Image
                                    className="rounded-full"
                                    src={imageUrl(randomPickedImage.public_id, randomPickedImage.format)}
                                    width={400}
                                    height={400}
                                    layout="fixed"
                                    alt="Top Avatar"
                                />
                            )}


                            <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
                        </div>

                        <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
                            2022年1月のアバター
                        </h1>
                        <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
                            本格的に寒くなってきました。お身体を大切にしてくださいね。
                        </p>

                    </div>
                    {images.map(({ id, public_id, format, blurDataUrl, mosaic }) => (
                        <Link
                            key={id}
                            href={{
                                pathname: `/${name}/${date}`,
                                query: { photoId: id },
                            }}
                            ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                            shallow={true}
                            className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                        >
                            <Image
                                alt="Next.js Conf photo"
                                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                                style={{ transform: 'translate3d(0, 0, 0)' }}
                                placeholder="blur"
                                blurDataURL={blurDataUrl}
                                src={imageUrl(public_id, format, mosaic ? "c_scale,w_30" : undefined)}
                                width={720}
                                height={480}
                                sizes="(max-width: 640px) 100vw,
                                    (max-width: 1280px) 50vw,
                                    (max-width: 1536px) 33vw,
                                    25vw"
                            />
                        </Link>
                    ))}
                </div>

            </main>

        </>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
    //URLからパラメータを取得 
    const { name, date } = context.params

    const results = await cloudinary.v2.search
        .expression(`folder:${name}/${date}/*`)
        .sort_by('public_id', 'desc')
        .with_field("tags")
        .max_results(100)
        .execute()
    let reducedResults: ImageProps[] = []

    let i = 0
    for (let result of results.resources) {
        reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
            mosaic: result.tags.includes("mosaic"),
        })
        i++
    }

    const blurImagePromises = results.resources.map((image: ImageProps) => {
        return getBase64ImageUrl(image)
    })
    const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

    for (let i = 0; i < reducedResults.length; i++) {
        reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
    }

    return {
        props: {
            images: reducedResults,
        },
    }
}


export const getStaticPaths: GetStaticPaths = async () => {
    //全てのフォルダを取得
    return {
        paths: [],
        fallback: 'blocking',
    }
}
