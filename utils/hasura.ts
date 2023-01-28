import { request, gql, GraphQLClient } from 'graphql-request'

export const hasuraRequest = (query, variables) => {
    const url = "https://main-airedale-23.hasura.app/v1/graphql"


    const headers = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    }

    const client = new GraphQLClient(url, { headers })
    return client.request(query, variables)
}