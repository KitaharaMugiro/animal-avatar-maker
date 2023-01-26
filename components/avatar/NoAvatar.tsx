import Head from "next/head"
import { ImageProps } from "../../utils/types"
import Uploader from "./Uploader"

interface Props {
    name: string,
    inputImages: ImageProps[]
}
export default (props: Props) => {
    const isInputUploaded = props.inputImages.length > 0


    return <div>
        <Head>
            <title>{props.name}さんのギャラリー | アニマルアバターメーカー</title>
            <meta
                property="og:image"
                content="https://asset.cloudinary.com/ddeqwb08j/3dee328119b5e06a5f76503c0c585214"
            />
            <meta
                name="twitter:image"
                content="https://asset.cloudinary.com/ddeqwb08j/3dee328119b5e06a5f76503c0c585214"
            />
        </Head>
        <Uploader />

    </div>
}