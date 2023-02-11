import { useEffect, useState } from "react";
import ShowPrompts from "../../components/avatar/ShowPrompts";

export default () => {
    const [prompts, setPrompts] = useState([])
    useEffect(() => {
        // 2つのpromptを初期化する
        setPrompts([
            "", "", ""
        ])
    }, [])

    return <div >
        {prompts.map((prompt, index) => {
            console.log({ index })
            return <div key={index}>
                <ShowPrompts
                    index={index + 1}
                    onSetPrompt={(prompt) => {
                        // promptを更新する
                        const newPrompts = [...prompts]
                        newPrompts[index] = prompt
                        setPrompts(newPrompts)
                    }}
                />
            </div>
        })}

        {JSON.stringify(prompts)}
    </div>
}