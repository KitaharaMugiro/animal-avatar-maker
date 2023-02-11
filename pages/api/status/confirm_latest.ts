import { request, gql } from 'graphql-request'
import { hasuraRequest } from "../../../utils/hasura";

export const getUserLatestStatus = async (user_id) => {
    const query = gql`
        query ($user_id: String) {
            wait_list(where: {user_id: {_eq: $user_id}}, order_by: {created_at: desc}, limit: 1) {
                user_id
                status
                plan
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
        return null
    }
    const statusData = hasuraResponse.wait_list[0]
    if (!statusData) {
        return null
    }
    return statusData
}

export default async (req, res) => {
    const { user_id } = req.query;

    //現在の最新のステータスを取得する
    const statusData = await getUserLatestStatus(user_id)
    if (!statusData) {
        res.status(200).json({
            status: null
        })
        return
    }

    //もしwaitingであれば、何番目なのかも返す
    if (statusData.status === "waiting") {
        const query = gql`
            query  {
                wait_list(where: {status: {_eq: "waiting"}}, order_by: {created_at: asc}) {
                    user_id
                    plan
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
            status: statusData,
            waiting_number: waiting_number,
            your_number: your_number
        })

    } else {
        res.status(200).json({
            status: statusData
        })
    }

};
