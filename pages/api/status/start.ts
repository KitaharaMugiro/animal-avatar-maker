import { request, gql } from 'graphql-request'
import { hasuraRequest } from "../../../utils/hasura";


export default async (req, res) => {
    const { user_id, class_name, prompts } = req.body;
    const query = gql`
            mutation ($user_id: String, $plan: String, $prompt_version: numeric, $class_name: String) {
            insert_avatar_generate_status_one(
                object: {
                user_id: $user_id, 
                plan: $plan, 
                prompt_version: $prompt_version,
                class_name : $class_name,
                status: "waiting"
                
                }, on_conflict: {
                constraint: avatar_generate_status_pkey, 
                update_columns: [plan, prompt_version, class_name, status]}) {
                user_id
            }
        }
    `
    const variables = { "user_id": user_id, "plan": plan, "prompt_version": prompt_version, "class_name": class_name }

    const hasuraResponse = await hasuraRequest(query, variables)
    console.log(hasuraResponse)
    res.status(200).json(hasuraResponse)
};
