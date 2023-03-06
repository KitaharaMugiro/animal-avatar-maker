// SNS投稿が必須の人に送るページ
import type { NextPage } from "next"
import { SNSCampaignPage } from "../../components/campaign/SNSCampaignPage"

//TODO: Redirectでいいと思う
const Home: NextPage = () => {
    return <SNSCampaignPage />
}

export default Home
