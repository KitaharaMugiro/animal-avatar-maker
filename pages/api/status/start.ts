import { request, gql } from "graphql-request"
import { discord_notification } from "../../../utils/discord_notification"
import { hasuraRequest } from "../../../utils/hasura"
import { getUserLatestStatus } from "./confirm_latest"

export default async (req, res) => {
    const { user_id, class_name, prompts, plan, email } = req.body

    const statusData = await getUserLatestStatus(user_id)
    if (statusData && statusData.status === "waiting") {
        res.status(200).json({
            status: "already_waiting",
        })
        return
    }

    const query = gql`
        mutation (
            $user_id: String
            $class_name: String
            $plan: String
            $email: String
            $data: [user_prompts_insert_input!]!
        ) {
            animal_insert_wait_list_one(
                object: {
                    status: "waiting"
                    user_id: $user_id
                    class_name: $class_name
                    plan: $plan
                    email: $email
                    user_prompts: { data: $data }
                }
            ) {
                id
                user_prompts {
                    id
                    prompt
                }
            }
        }
    `

    const prompt_data = prompts.map((prompt) => {
        return {
            prompt: prompt,
            user_id: user_id,
        }
    })
    const variables = {
        user_id: user_id,
        class_name: class_name,
        data: prompt_data,
        plan: plan,
        email: email,
    }

    const hasuraResponse = await hasuraRequest(query, variables)
    if (process.env.NODE_ENV === "production") {
        await discord_notification(
            `Waitリストにリクエストが追加されました。(user_id: ${user_id}, plan: ${plan}, mail: ${email}, class_name: ${class_name})`
        )
    }
    res.status(200).json(hasuraResponse)
}
