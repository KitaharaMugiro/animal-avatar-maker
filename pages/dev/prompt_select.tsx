import { useEffect, useState } from "react";
import MultiPromptSelectors from "../../components/avatar/MultiPromptSelectors";
import ShowPrompts from "../../components/avatar/PromptSelector";



export default () => {
    const [prompts, setPrompts] = useState(["", "", ""])
    return <div >
        <MultiPromptSelectors
            prompts={prompts}
            setPrompts={setPrompts}
            use_num={2} />
    </div>
}