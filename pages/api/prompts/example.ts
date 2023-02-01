import { request, gql } from 'graphql-request'
import { hasuraRequest } from '../../../utils/hasura';



export default async (req, res) => {
    const query = gql`
        query {
            example_prompts {
                id
                prompt
                title
                example_image
            }
        }
    `
    const hasuraResponse = await hasuraRequest(query)
    const { example_prompts } = hasuraResponse
    //ランダムに５つを選択
    const randomPrompts = example_prompts.sort(() => Math.random() - 0.5).slice(0, 5)
    res.status(200).json({
        prompts: randomPrompts //{id: 1, prompt: "test", title: "test", example_image: "example/1_1.png"}
    })
};