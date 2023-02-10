import { StatusData } from "../../../pages/[name]/status"
import WaitingStatusCard from "./card/WaitingStatusCard"
import GeneratedStatus from "./GeneratedStatus"
import GeneratingStatus from "./GeneratingStatus"
import NoStatus from "./NoStatus"

interface Props {
    statusData: StatusData
}

export default (props: Props) => {
    const { statusData } = props
    const status = statusData?.status?.status || ""

    const renderByStatus = () => {
        if (status === "waiting" || status === "preparing") {
            //TODO: ステータスが待機中であればステータスを表示する
            return <GeneratingStatus />
        } else if (status === "generating") {
            //TODO: 一部作られつつあるのでギャラリーに遷移するリンクを提示する
            return <GeneratingStatus />
        } else if (status === "generated" || status === "complete") {
            //TODO: ステータスが完了であればギャラリーに遷移するリンクと、追加で作成する選択肢を提示する
            return <GeneratedStatus />
        } else {
            //TODO: ステータスがない場合はアバター作成画面を表示
            return <NoStatus />
        }
    }

    return (
        <>
            {/* <WaitingStatusCard /> */}
            {renderByStatus()}
        </>
    )
}