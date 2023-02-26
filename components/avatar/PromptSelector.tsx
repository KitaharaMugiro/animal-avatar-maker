import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ReactLoading from "react-loading"
import { imageUrlFromPath } from "../../utils/imageUrl"

type PromptExample = {
    id: string
    title: string
    image: string
    prompt: string
}

const green_css =
    "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
const red_css =
    "bg-red-50 border border-red-500 text-red-900 dark:text-grredeen-400 placeholder-red-700 dark:placeholder-red-500 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"

interface Props {
    onSetPrompt: (prompt: string) => void
    index: number
}

export default function PromptSelector(props: Props) {
    const [examples, setExamples] = useState<PromptExample[]>([])
    useEffect(() => {
        // APIを呼び出す
        fetch("/api/prompts/example")
            .then((res) => res.json())
            .then((data) => {
                const prompts: PromptExample[] = data.prompts.map((val) => {
                    return {
                        id: val.id,
                        title: val.title,
                        image: imageUrlFromPath(val.example_image + ".png"),
                        prompt: val.prompt.replace("{identifier}", "MY_PET"),
                    }
                })
                setExamples(prompts)
            })
    }, [])

    const [prompt, setPrompt] = useState("")
    const [placeholder, setPlaceholder] = useState(
        "作りたいイラストをタップするか、こちらに作りたいイラストを英語で記載してください"
    )
    const onSelectPrompt = (e: PromptExample) => {
        onSetPrompt(e.prompt)
    }

    const handleMouseEnter = (e: PromptExample) => {
        setPlaceholder(() => e.prompt)
    }

    const handleMouseLeave = () => {
        setPlaceholder(() => "作りたいイラストをタップするか、こちらに作りたいイラストを英語で記載してください")
    }

    const [textError, setTextError] = useState("")
    const [color, setColor] = useState(green_css)

    const onSetPrompt = (_prompt: string) => {
        setPrompt(_prompt)
        if (_prompt.match("MY_PET")) {
            setTextError("")
            setColor(green_css)
            props.onSetPrompt(_prompt)
        } else {
            setTextError("MY_PETの文字を入れてください")
            setColor(red_css)
        }
    }

    const isPromptOk = prompt !== "" && prompt.match("MY_PET")
    const borderColor = isPromptOk ? "border-2 border-green-500" : "border-2 border-red-500"

    return (
        <div>
            <p className="mb-1 flex justify-center px-6">作りたいイラストを選ぶ ({props.index}個目)</p>

            <div className="mb-1 flex justify-center">
                <textarea
                    value={prompt}
                    placeholder={placeholder}
                    onBlur={(e) => onSetPrompt(e.target.value)}
                    onChange={(e) => setPrompt(e.target.value)}
                    id="prompt"
                    html-rows="4"
                    className={color}
                ></textarea>
            </div>
            {textError && (
                <p className="mb-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">{textError}</span>
                </p>
            )}

            <div className={`${borderColor} mt-1 flex flex-wrap justify-center bg-slate-100 p-3 `}>
                {examples.length == 0 && (
                    <ReactLoading type="spin" color="#ebc634" height="70px" width="70px" className="mx-auto" />
                )}
                {examples.map((val) => (
                    <div className="m-1" key={val.prompt}>
                        <div
                            className="mx-3 cursor-pointer"
                            onClick={() => onSelectPrompt(val)}
                            onMouseEnter={() => handleMouseEnter(val)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="w-1/1">
                                <img
                                    className="h-32 w-32 rounded-xl hover:shadow-2xl md:h-48 md:w-48"
                                    src={val.image}
                                    width={200}
                                    height={200}
                                    alt={val.title}
                                />
                                <p className="mt-1 flex justify-center">{val.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
