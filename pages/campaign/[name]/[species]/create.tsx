import { GetServerSideProps } from "next"
import { FreeCampaignCreatePage } from "../../../../components/create/FreeCampaignCreatePage"
import { getInputImages } from "../../../../utils/getImages"
import { CloudinaryImageProps } from "../../../../utils/types"

export default ({ inputImages }: { inputImages: CloudinaryImageProps[] }) => {
    return <FreeCampaignCreatePage inputImages={inputImages} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    //URLからパラメータを取得
    const { name } = context.params
    const inputResults = await getInputImages(name as string)
    return {
        props: {
            inputImages: inputResults,
        },
    }
}
