import { request, gql } from 'graphql-request'
import { hasuraRequest } from "../../../utils/hasura";


export default async (req, res) => {
    const { user_id, class_name, prompts } = req.body;

    //TODO:すでにwaitリストに入っていたらエラーが出るようにしたい

    const query = gql`
        mutation (
            $user_id: String, 
            $class_name: String,
            $data: [user_prompts_insert_input!]!) {
            insert_wait_list_one(object: {
                status: "waiting", 
                user_id: $user_id, 
                class_name: $class_name,
                waiting: true, 
                user_prompts: {data: $data}}
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
        "user_id": user_id,
        "class_name": class_name,
        "data": prompt_data
    }

    const hasuraResponse = await hasuraRequest(query, variables)
    console.log(hasuraResponse)
    res.status(200).json(hasuraResponse)
};
