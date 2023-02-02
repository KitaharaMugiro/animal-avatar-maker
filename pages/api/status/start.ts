import { request, gql } from 'graphql-request'
import { hasuraRequest } from "../../../utils/hasura";


export default async (req, res) => {
    const { user_id, class_name, prompts } = req.body;
    const query = gql`
            
    `
    const variables = { "user_id": user_id, "class_name": class_name }

    const hasuraResponse = await hasuraRequest(query, variables)
    console.log(hasuraResponse)
    res.status(200).json(hasuraResponse)
};
