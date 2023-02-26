/* eslint-disable no-unused-vars */
export interface CloudinaryImageProps {
    id: number
    height: string
    width: string
    public_id: string
    format: string
    mosaic: boolean
    sample: boolean
}

export interface SharedModalProps {
    index: number
    images?: CloudinaryImageProps[]
    currentPhoto?: CloudinaryImageProps
    changePhotoId: (newVal: number) => void
    closeModal: () => void
    navigation: boolean
    direction?: number
}
