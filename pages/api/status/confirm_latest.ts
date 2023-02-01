import { request, gql } from 'graphql-request'
import { hasuraRequest } from "../../../utils/hasura";


export default async (req, res) => {
    const { user_id } = req.body;

    //現在の最新のステータスを取得する

    const query = gql`
        query ($user_id: String) {
            wait_list(where: {user_id: {_eq: $user_id}}, order_by: {created_at: desc}, limit: 1) {
                user_id
                status
                class_name
                created_at
                updated_at
            }
        }
    `
    const variables = {
        user_id: user_id
    }
    const hasuraResponse = await hasuraRequest(query, variables)
    if (hasuraResponse.wait_list.length === 0) {
        res.status(200).json({
            status: null,
        })
    }

    //もしwaitingであれば、何番目なのかも返す
    if (hasuraResponse.wait_list[0].status === "waiting") {
        const query = gql`
            query  {
                wait_list(where: {status: {_eq: "waiting"}}, order_by: {created_at: asc}) {
                    user_id
                    status
                    class_name
                    created_at
                    updated_at
                }
            }
        `

        const hasuraResponse = await hasuraRequest(query)
        const waiting_number = hasuraResponse.wait_list.length
        const your_number = hasuraResponse.wait_list.findIndex((wait_list) => wait_list.user_id === user_id) + 1
        res.status(200).json({
            status: "waiting",
            waiting_number: waiting_number,
            your_number: your_number
        })

    } else {
        res.status(200).json({
            status: hasuraResponse.wait_list[0].status
        })
    }

};
