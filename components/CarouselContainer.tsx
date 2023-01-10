import { Head } from "next/document"

import { useRouter } from "next/router"
import { imageUrl } from "../utils/imageUrl"
import { ImageProps } from "../utils/types"
import Carousel from "./Carousel"

interface Props {
    currentPhoto: ImageProps
}

export const CrouselContainer = (props: Props) => {
    const router = useRouter()
    const { photoId } = router.query
    let index = Number(photoId)
    const { currentPhoto } = props
    return (
        <Carousel currentPhoto={currentPhoto} index={index} />
    )
}