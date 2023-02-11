import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { imageUrlFromPath } from "../../utils/imageUrl";

type PromptExample = {
    id: string
    title: string
    image: string
    prompt: string
}

const green_css = "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
const red_css = "bg-red-50 border border-red-500 text-red-900 dark:text-grredeen-400 placeholder-red-700 dark:placeholder-red-500 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"

interface Props {
    onSetPrompt: (prompt: string) => void
    index: number
}

export default function ShowPrompts(props: Props) {
    const [examples, setExamples] = useState<PromptExample[]>([])
    useEffect(() => {
        // APIを呼び出す
        fetch("/api/prompts/example").then((res) => (res.json())).then((data) => {
            const prompts: PromptExample[] = data.prompts.map(val => {
                return {
                    id: val.id,
                    title: val.title,
                    image: imageUrlFromPath(val.example_image + ".png"),
                    prompt: val.prompt.replace("{identifier}", "MY_PET")
                }
            })
            setExamples(prompts)
        })
    }, [])

    const [prompt, setPrompt] = useState("");
    const [placeholder, setPlaceholder] = useState("ここにプロンプトが表示されます");
    const onSelectPrompt = (e: PromptExample) => {
        onSetPrompt(e.prompt)
    }

    const handleMouseEnter = (e: PromptExample) => {
        setPlaceholder(() => e.prompt)
    }

    const handleMouseLeave = () => {
        setPlaceholder(() => "ここにプロンプトが表示されます")
    }

    const [textError, setTextError] = useState('')
    const [color, setColor] = useState(green_css)

    const onSetPrompt = (_prompt: string) => {
        setPrompt(_prompt)
        if (_prompt.match('MY_PET')) {
            setTextError('')
            setColor(green_css)
            props.onSetPrompt(_prompt)
        } else {
            setTextError('MY_PETの文字を入れてください')
            setColor(red_css)
        }

    }

    const ShowExamplePrompt = () => {
        return <div>
            <p className="mt-1 flex justify-center px-6">プロンプトを選ぶ ({props.index}個目)</p>
            <div className="mt-3 flex flex-wrap justify-center bg-slate-100 p-3">
                {examples.map((val) =>
                    <div className="m-1" key={val.prompt}>
                        <div className="mx-3 cursor-pointer"
                            onClick={() => onSelectPrompt(val)}
                            onMouseEnter={() => handleMouseEnter(val)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="w-1/1">
                                <img className="rounded-xl hover:shadow-2xl"
                                    src={val.image} width={100} height={100}
                                    alt={val.title} />
                                <p className="mt-1 flex justify-center">{val.title}</p></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    }


    return <div >
        <ShowExamplePrompt />
        <div>
            <div className="mt-1 flex justify-center">
                <textarea
                    value={prompt}
                    placeholder={placeholder}
                    onBlur={(e) => onSetPrompt(e.target.value)}
                    onChange={(e) => setPrompt(e.target.value)}
                    id="prompt" html-rows="4"
                    className={color}>
                </textarea>
            </div>
            {textError && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{textError}</span></p>}
        </div>
    </div>
}