export default () => {

    return <div
        className="relative overflow-scroll shadow-sm mt-5"
        style={{ whiteSpace: "nowrap" }}>
        <table className="w-full table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                <tr>
                    <th scope="col" className="px-6 py-3 w-32">
                        プラン名
                    </th>
                    <th scope="col" className="px-6 py-3 w-20">
                        枚数
                    </th>
                    <th scope="col" className="px-6 py-3 w-20">
                        クオリティ
                    </th>
                    <th scope="col" className="px-6 py-3 w-20">
                        待ち時間
                    </th>
                    <th scope="col" className="px-6 py-3 w-20">
                        価格
                    </th>
                </tr>
            </thead>
            <tbody >
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        お試し
                    </th>
                    <td className="px-6 py-4">
                        2枚
                    </td>
                    <td className="px-6 py-4">
                        低い
                    </td>
                    <td className="px-6 py-4">
                        あり
                    </td>
                    <td className="px-6 py-4">
                        0円
                    </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        スタンダード
                    </th>
                    <td className="px-6 py-4">
                        10枚
                    </td>
                    <td className="px-6 py-4">
                        高い
                    </td>
                    <td className="px-6 py-4">
                        優先
                    </td>
                    <td className="px-6 py-4">
                        1280円
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
}