import Link from "next/link"
import { useRouter } from "next/router"

export default () => {
    const router = useRouter()
    const { name } = router.query
    return (
        <div className="flex flex-col items-center justify-center h-screen p-5">
            <div className="flex flex-col items-center justify-center">
                <div className="text-2xl font-bold">作成完了しました。以下のリンクから確認してください</div>
                <Link href={"/" + name} className="text-blue-500">
                    出来上がったアバターはこちら
                </Link>

            </div>
        </div>
    )
}