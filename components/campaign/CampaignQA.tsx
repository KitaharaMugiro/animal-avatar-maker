import { Text } from "@mantine/core"

export default function CampaignQA() {
    return (
        <div>
            <div className="mx-auto mt-20 w-full max-w-md  space-y-2">
                <Text size="xl">Q&A</Text>
                <details className="rounded-lg">
                    <summary className="py-4 font-semibold">複数匹のペットを一度に作成することはできますか？</summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                            申し訳ございません。現在は一匹ずつの作成となっております。
                            <br />
                            画像をアップロードする際も、一匹ずつアップロードしていただく必要がございます。
                        </p>
                    </div>
                </details>
                <details className="rounded-lg">
                    <summary className="py-4 font-semibold">SNS投稿はどのようにやれば良いですか？</summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                            #アニマルアバターメーカー
                            のハッシュタグをつけてTwitterもしくはInstagramにて投稿お願いします！
                            <br />
                            気に入ったイラストを選んでいただいて投稿お願いします。
                            <br />
                            まだまだサービスの認知度が低いので、ご協力いただけると嬉しいです。
                        </p>
                    </div>
                </details>
                <details className="rounded-lg">
                    <summary className="py-4 font-semibold">
                        もっと作ってみたくなった場合はどうすれば良いですか？
                    </summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                            通常プランでいつでもお受けいたします！
                            <br />
                            お支払いはPayPayもしくはクレジットカードでお受けいたします。
                        </p>
                    </div>
                </details>
                <details className="rounded-lg">
                    <summary className="py-4 font-semibold">商用利用などは可能ですか？</summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                            はい、可能です。
                            <br />
                            商用利用、二次利用等なんでもOKです。
                        </p>
                    </div>
                </details>
                <details className="rounded-lg">
                    <summary className="py-4 font-semibold">
                        イラストを使ってうちの子グッズを作ってみたいですが、可能ですか？
                    </summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                            はい、ぜひ作っていただけると嬉しいです。
                            <br />
                            また、当サービスではイラストを使ってTシャツやカレンダーなどのグッズを作成することもできるので、インスタグラムにてご相談いただけますと幸いです。
                        </p>
                    </div>
                </details>
            </div>
        </div>
    )
}
