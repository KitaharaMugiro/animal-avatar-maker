import { useState } from "react"

interface Props {
    plan: string
    setPlan: (plan: string) => void
}

export default (props: Props) => {

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.setPlan(e.target.value)
    }

    return <div>
        <label htmlFor="plan" className="block mb-2 text-lg font-medium text-gray-900">
            プランを選ぶ
        </label>
        <select
            id="plan"
            value={props.plan}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="none">プランを選んでね</option>
            <option value="free">お試し 2種類 (0円)</option>
            <option value="standard">スタンダード 10種類 (1280円)</option>
        </select>

    </div>
}