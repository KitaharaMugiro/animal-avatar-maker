interface Props {
    email: string
    setEmail: (email: string) => void
}

export default (props: Props) => {

    return <div>
        <label htmlFor="plan" className="block mb-2 text-lg font-medium text-gray-900">
            通知先のメールアドレスを入力(作成に数時間から数日かかります)
        </label>
        <input
            id="email"
            type="email"
            value={props.email}
            onChange={e => props.setEmail(e.target.value)}
            placeholder="animal@avatar.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">

        </input>
    </div>
}