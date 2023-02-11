import cloudinary from "./cloudinary"
import { CloudinaryImageProps } from "./types"

//サーバからしか呼べません
export const getImages = async (name: string, date: string) => {
    const results = await cloudinary.v2.search
        .expression(`folder:output/${name}/${date}/*`)
        .sort_by('created_at', 'desc')
        .with_field("tags")
        .max_results(150)
        .execute()

    let reducedResults: CloudinaryImageProps[] = []
    let i = 0
    for (let result of results.resources) {
        reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
            mosaic: result.tags ? result.tags.includes("mosaic") : false,
            sample: result.tags ? result.tags.includes("sample") : false,
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

    return reducedResults
}


export const getAllImages = async (name: string) => {
    const results = await cloudinary.v2.search
        .expression(`folder:output/${name}/*`)
        .sort_by('created_at', 'desc')
        .with_field("tags")
        .max_results(150)
        .execute()

    let reducedResults: CloudinaryImageProps[] = []
    let i = 0
    for (let result of results.resources) {
        reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
            mosaic: result.tags ? result.tags.includes("mosaic") : false,
            sample: result.tags ? result.tags.includes("sample") : false,
        })
        i++
    }

    // mosaic = false と sample = falseの画像を先に持ってくる
    reducedResults.sort((a, b) =>
        (a.mosaic && !b.mosaic) ? 1 :
            (!a.mosaic && b.mosaic) ? -1 :
                (a.sample && !b.sample) ? 1 :
                    (!a.sample && b.sample) ? -1 :
                        0
    );

    // id振り直し
    i = 0
    for (let result of reducedResults) {
        result.id = i
        i++
    }

    return reducedResults
}


export const getInputImages = async (name: string) => {
    const results = await cloudinary.v2.search
        .expression(`folder:input/${name}/*`)
        .sort_by('created_at', 'desc')
        .max_results(15)
        .execute()

    let reducedResults: CloudinaryImageProps[] = []
    let i = 0
    for (let result of results.resources) {
        reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
            mosaic: false,
            sample: false,
        })
        i++
    }

    return reducedResults
}
