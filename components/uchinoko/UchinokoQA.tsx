import { Text } from '@mantine/core';

export default function UchinokoQA() {
    return (
        <div>

            <div className="w-full mx-auto mt-20 space-y-2  max-w-md">
                <Text size="xl">Q&A</Text>
                <details className="rounded-lg">
                    <summary className="py-4 font-semibold">
                        解約はいつでもできますか？
                    </summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                            いつでも解約可能です！ 現在マイページの準備中ですがそこからいつでも解約可能にします。<br />
                            マイページが完成するまでは、お手数ですがインスタグラムのメッセージよりご連絡ください。
                        </p>
                    </div>
                </details>
                <details className="rounded-lg">
                    <summary className="py-4 font-semibold">
                        初月以降のお支払いはどのようになりますか？
                    </summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                            初月以降も継続しても良いなと思っていただけましたら、正規料金(1500円 + 送料印刷費500円)で来月もイラストをお届けします！<br />
                            次回のお届けが確定している場合はキャンセル不可となります。ご了承ください。
                        </p>
                    </div>
                </details>
                <details className="rounded-lg">
                    <summary className="py-4 font-semibold">
                        支払いはどのような方法がありますか？
                    </summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                            クレジット決済のみとなります。<br />
                            VISA 、MasterCard、JCB、アメリカン・エキスプレス、ダイナースクラブのカードがご利用できます。
                        </p>
                    </div>
                </details>
                <details className="rounded-lg">
                    <summary className="py-4 font-semibold">
                        お空組ですが、イラストをお届けしてもらえますか？
                    </summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                            はい！過去の写真を元にイベントやその時期に合った作品をお届けいたします！<br />
                            イラストよりもリアルな写真をお届けすることができ、天国でのうちの子の姿をお届けできます。
                        </p>
                    </div>
                </details>
            </div>
        </div>
    );
}