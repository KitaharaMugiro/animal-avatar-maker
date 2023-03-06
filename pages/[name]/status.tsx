import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import LatestStatusDisplay from "../../components/avatar/status/LatestStatusDisplay"
import MyFooter from "../../components/common/MyFooter"
import MyHeader from "../../components/common/MyHeader"

//このページはいずれ消して、statusディレクトリに移動させる
export type StatusData = {
    status?: {
        user_id: string
        plan: string
        status: string
        class_name: string
        created_at: string
        updated_at: string
    }
    waiting_number?: number
    your_number?: number
}

const StatusPage = () => {
    const router = useRouter()
    const { name } = router.query
    const [status, setStatus] = useState<StatusData>(null)
    useEffect(() => {
        if (name === undefined) return
        fetch("/api/status/confirm_latest?user_id=" + name)
            .then((res) => res.json())
            .then((_data) => {
                const data = _data as StatusData
                setStatus(data)
            })
    }, [name])

    return (
        <>
            <MyHeader />
            {status === null ? <div>ローディング</div> : <LatestStatusDisplay statusData={status} />}
            <MyFooter />
        </>
    )
}
export default StatusPage
