import formidable from "formidable"
import cloudinary from "../../utils/cloudinary"
import { request, gql } from "graphql-request"
import { hasuraRequest } from "../../utils/hasura"

export default async (req, res) => {
    const { user_id } = req.query
    const query = gql`
        query ($user_id: String) {
            animal_avatar_generate_status(where: { user_id: { _eq: $user_id } }) {
                user_id
                plan
                status
                prompt_version
                date
                created_at
                updated_at
            }
        }
    `
    const variables = { user_id: user_id }

    const hasuraResponse = await hasuraRequest(query, variables)
    res.status(200).json(hasuraResponse)
}
