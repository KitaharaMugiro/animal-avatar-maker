export const imageUrl = (public_id: string, format: string, param?: string) => {
    if (param) {
        return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${param}/${public_id}.${format}`
    }
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_512/${public_id}.${format}`
}