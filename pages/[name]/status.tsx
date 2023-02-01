import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import StatusDisplay from "../../components/avatar/status/StatusDisplay"
import MyFooter from "../../components/common/MyFooter"
import MyHeader from "../../components/MyHeader"

const StatusPage = () => {
    const router = useRouter()
    const { name } = router.query
    const [status, setStatus] = useState("")
    useEffect(() => {
        //TODO: latestのステータスを取得するように変更する
        fetch('/api/get_status?user_id=' + name).then(res => res.json()).then(data => {
            if (data.avatar_generate_status && data.avatar_generate_status.length > 0) {
                setStatus(data.avatar_generate_status[0].status)
            }
        })
    }, [name])

    return <>
        <MyHeader />
        <StatusDisplay status={status} />
        <MyFooter />
    </>
}
export default StatusPage