export const imageUrl = (public_id: string, format: string, mosaic: boolean, sample: boolean) => {
    if (sample) {
        return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_512/l_text:Arial_100_bold:Sample/${public_id}.${format}`
    }
    if (mosaic) {
        return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_30/${public_id}.${format}`
    }
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_512/${public_id}.${format}`
}

export const thumbailImageUrl = (public_id: string, format: string) => {
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_80/${public_id}.${format}`
}

export const imageUrlFromPath = (path: string) => {
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_120${path}.png`
}