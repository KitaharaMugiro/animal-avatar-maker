import Image from "next/image"
import { useRouter } from "next/router"
import useKeypress from "react-use-keypress"
import type { CloudinaryImageProps } from "../utils/types"
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto"
import SharedModal from "./SharedModal"

export default function Carousel({ index, currentPhoto }: { index: number; currentPhoto: CloudinaryImageProps }) {
    const router = useRouter()
    const { name, date } = router.query
    const [, setLastViewedPhoto] = useLastViewedPhoto()

    function closeModal() {
        setLastViewedPhoto(currentPhoto.id)
        if (date) {
            router.push(`/${name}/${date}`, undefined, { shallow: true })
        } else {
            router.push(`/${name}`, undefined, { shallow: true })
        }
    }

    function changePhotoId(newVal: number) {
        return newVal
    }

    useKeypress("Escape", () => {
        closeModal()
    })

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <button
                className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl"
                onClick={closeModal}
            ></button>
            <SharedModal
                index={index}
                changePhotoId={changePhotoId}
                currentPhoto={currentPhoto}
                closeModal={closeModal}
                navigation={false}
            />
        </div>
    )
}
