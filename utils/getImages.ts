import cloudinary from "./cloudinary"
import { ImageProps } from "./types"

let cachedResults
export const getImages = async (name: string, date: string) => {
    if (cachedResults) {
        return cachedResults
    }

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

    // mosaic = falseの画像を先に持ってくる
    reducedResults.sort((a, b) => {
        if (a.mosaic && !b.mosaic) {
            return 1
        } else if (!a.mosaic && b.mosaic) {
            return -1
        } else {
            return 0
        }
    })

    // id振り直し
    i = 0
    for (let result of reducedResults) {
        result.id = i
        i++
    }

    cachedResults = reducedResults
    return reducedResults
}