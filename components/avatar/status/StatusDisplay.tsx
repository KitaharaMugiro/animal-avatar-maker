import WaitingStatusCard from "./card/WaitingStatusCard"
import GeneratedStatus from "./GeneratedStatus"
import GeneratingStatus from "./GeneratingStatus"
import NoStatus from "./NoStatus"

interface Props {
    status: string
}

export default (props: Props) => {
    const { status } = props
    const renderByStatus = () => {

        //TODO: 一時的にステータスを表示しない
        return <div className="flex flex-col items-center justify-center h-screen p-5">
            <div className="flex flex-col items-center justify-center">
                <div className="text-2xl font-bold">アップロードありがとうございます！作成完了までしばらくお待ちください！</div>
            </div>
        </div>

        if (status === "") {
            return <div>ローディング</div>
        } else if (status === "waiting" || status === "preparing") {
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
            <WaitingStatusCard />
            {renderByStatus()}
        </>
    )
}