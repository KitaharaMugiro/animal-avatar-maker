import { PlanConst } from "../../const/PlanConst"

export default () => {
    const planOrder = ["free", "standard", "miniPack", "standardPack"]
    const rows = planOrder.map((plan) => {
        return <tr key={plan} className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {PlanConst[plan].name}
            </th>
            <td className="px-6 py-4">
                {PlanConst[plan].quantity}
            </td>
            <td className="px-6 py-4">
                {PlanConst[plan].quality}
            </td>
            <td className="px-6 py-4">
                {PlanConst[plan].waitTime}
            </td>
            <td className="px-6 py-4">
                {PlanConst[plan].price}円
            </td>
        </tr>
    })


    return <div
        className="relative overflow-scroll shadow-sm mt-5"
        style={{ whiteSpace: "nowrap" }}>
        <table className="table-fixed text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                <tr>
                    <th scope="col" className="px-6 py-3 w-38">
                        プラン名
                    </th>
                    <th scope="col" className="px-6 py-3 w-24">
                        枚数
                    </th>
                    <th scope="col" className="px-6 py-3 w-24">
                        クオリティ
                    </th>
                    <th scope="col" className="px-6 py-3 w-24">
                        待ち時間
                    </th>
                    <th scope="col" className="px-6 py-3 w-24">
                        価格
                    </th>
                </tr>
            </thead>
            <tbody >
                {rows}
            </tbody>
        </table>
    </div>
}