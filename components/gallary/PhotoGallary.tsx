
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useRef, useEffect } from "react"
import { imageUrl } from "../../utils/imageUrl"
import { CloudinaryImageProps } from "../../utils/types"
import { useLastViewedPhoto } from "../../utils/useLastViewedPhoto"
import Modal from "../Modal"
import Image from 'next/image'

interface Props {
    images: CloudinaryImageProps[]
    inputImages: CloudinaryImageProps[]
}

export default (props: Props) => {
    const { images: _images } = props
    const router = useRouter()
    const { photoId, name } = router.query
    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()
    const [showMore, setShowMore] = useState(false)
    const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)


    useEffect(() => {
        // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
        if (lastViewedPhoto && !photoId) {
            lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
            setLastViewedPhoto(null)
        }
    }, [photoId, lastViewedPhoto, setLastViewedPhoto])


    let images = _images
    if (!showMore) {
        images = _images.filter(i => i.mosaic !== true)
    }

    return <main className="mx-auto max-w-[1960px] p-4">
        {/* ヘッダー */}
        {/* <MyHeader headerVisible={headerVisible} /> */}

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

            {images.map(({ id, public_id, format, mosaic, sample }) => (
                <Link
                    key={id}
                    href={{
                        pathname: `/${name}`,
                        query: { photoId: id },
                    }}
                    ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                    shallow={true}
                    className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                >
                    <Image
                        alt="avatar"
                        className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                        style={{ transform: 'translate3d(0, 0, 0)' }}
                        src={imageUrl(public_id, format, mosaic, sample)}
                        width={720}
                        height={480}
                        unoptimized
                        sizes="(max-width: 640px) 100vw,
                        (max-width: 1280px) 50vw,
                        (max-width: 1536px) 33vw,
                        25vw"
                    />
                </Link>
            ))}

            {/* show more button */}
            {!showMore && (
                <button
                    className="w-full py-4 text-white bg-gradient-to-r from-[#2193b0] to-[#6dd5ed] rounded-lg shadow-highlight"
                    onClick={() => setShowMore(true)}
                >
                    <b>もっとみたい</b>
                </button>
            )}

        </div>
    </main>
}