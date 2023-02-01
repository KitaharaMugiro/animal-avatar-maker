
export default async (req, res) => {
    // discordにwebhookを送信して、「リクエストが送られました」というメッセージを送る
    // localhost:3000/api/test/discord にフロントエンドからリクエストを送ってDiscordにメッセージが送られるか確認する
    // chat gptに聞きながらやるといいかも

    res.status(200).json({
        message: "ok"
    })
};
