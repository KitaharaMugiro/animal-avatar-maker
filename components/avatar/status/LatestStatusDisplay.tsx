import { useRouter } from "next/router"
import { StatusData } from "../../../pages/[name]/status"
import { getYYYYMMDD } from "../../../utils/dateUtil"
import CreateNewAvatarCard from "./card/CreateNewAvatarCard"
import GeneratedStatusCard from "./card/GeneratedStatusCard"
import WaitingStatusCard from "./card/WaitingStatusCard"
import NoStatus from "./NoStatus"

interface Props {
    statusData: StatusData
}

export default (props: Props) => {
    const { statusData } = props
    const status = statusData?.status?.status || ""
    const router = useRouter()

    const renderByStatus = () => {
        const { name } = router.query
        const createdAt = new Date(statusData?.status?.created_at)
        //YYYYMMDDで表示する
        const dateText = getYYYYMMDD(createdAt)
        if (status === "waiting" || status === "preparing") {
            return <WaitingStatusCard
                date={createdAt.toLocaleString()}
                rank={statusData.your_number}
                waiting={statusData.waiting_number}
                plan={statusData.status.plan}
                isGenerating={statusData.status.status === "generating"}
                isWaiting={statusData.status.status === "waiting"}
            />
        } else if (status === "generating") {
            return <WaitingStatusCard
                date={createdAt.toLocaleString()}
                rank={statusData.your_number}
                waiting={statusData.waiting_number}
                plan={statusData.status.plan}
                isGenerating={statusData.status.status === "generating"}
                isWaiting={statusData.status.status === "waiting"}
            />
        } else if (status === "generated" || status === "complete") {
            //TODO: ステータスが完了であればギャラリーに遷移するリンクと、追加で作成する選択肢を提示する
            return <>
                <CreateNewAvatarCard name={name as string} />
                <GeneratedStatusCard
                    date={createdAt.toLocaleString()}
                    dateText={dateText}
                    name={name as string}
                    plan={statusData.status.plan}
                />
            </>
        } else {
            return <CreateNewAvatarCard name={name as string} />
        }
    }

    return (
        <div className="m-5 ml-8 flex">
            {renderByStatus()}
        </div>
    )
}