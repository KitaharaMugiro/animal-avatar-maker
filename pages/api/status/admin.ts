import { request, gql } from "graphql-request"
import { hasuraRequest } from "../../../utils/hasura"

export const getAllStatus = async () => {
    const query = gql`
        query {
            animal_wait_list(where: { status: { _neq: "generated" } }, order_by: { created_at: asc }) {
                user_id
                status
                plan
                class_name
                created_at
                updated_at
            }
        }
    `
    const hasuraResponse = await hasuraRequest(query)
    return hasuraResponse.wait_list
}

export default async (req, res) => {
    //現在のgenerated以外のステータスを取得する
    const statusList = await getAllStatus()
    res.status(200).json({
        statusList,
    })
}
