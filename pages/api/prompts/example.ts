import { request, gql } from "graphql-request"
import { hasuraRequest } from "../../../utils/hasura"

export default async (req, res) => {
    const query = gql`
        query {
            animal_example_prompts {
                id
                prompt
                title
                example_image
            }
        }
    `
    const hasuraResponse = await hasuraRequest(query)
    const { animal_example_prompts } = hasuraResponse
    //ランダムに５つを選択
    const randomPrompts = animal_example_prompts.sort(() => Math.random() - 0.5).slice(0, 5)
    res.status(200).json({
        prompts: randomPrompts, //{id: 1, prompt: "test", title: "test", example_image: "example/1_1.png"}
    })
}
