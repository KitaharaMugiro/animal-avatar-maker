import { request, gql, GraphQLClient } from "graphql-request"
import { discord_notification } from "./discord_notification"

export const hasuraRequest = (query, variables = {}) => {
    const url = "https://adequate-guinea-56.hasura.app/v1/graphql"

    const headers = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    }

    const client = new GraphQLClient(url, { headers })
    try {
        return client.request(query, variables)
    } catch {
        if (process.env.NODE_ENV === "production") {
            discord_notification(`hasuraRequestでエラーが起きました。(query: ${query}, variables: ${variables})`)
        }
    }
}
