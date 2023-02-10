import { useRouter } from "next/router"
import { useEffect } from "react"
import WaitingStatusCard from "./card/WaitingStatusCard"

export default () => {
    const router = useRouter()
    const { name } = router.query
    return (
        <>
            <WaitingStatusCard
                date="2021/08/15"
                rank={3}
                waiting={10}
                plan="free"
            />
        </>

    )
}