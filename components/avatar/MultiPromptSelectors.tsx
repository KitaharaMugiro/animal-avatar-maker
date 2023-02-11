import { useState, useEffect } from "react"
import PromptSelector from "./PromptSelector"

interface Props {
    prompts: string[]
    setPrompts: (prompts: string[]) => void
    use_num: number
}

export default (props: Props) => {
    const { prompts: _prompts, setPrompts } = props
    const prompts = _prompts.slice(0, props.use_num)
    return <div >
        {prompts.map((prompt, index) => {
            return <div key={index} className="mb-10">
                <PromptSelector
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
    </div>
}