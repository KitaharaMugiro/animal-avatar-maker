export default async (req, res) => {
    // discordにwebhookを送信して、「リクエストが送られました」というメッセージを送る
    // localhost:3000/api/test/discord にフロントエンドからリクエストを送ってDiscordにメッセージが送られるか確認する
    'use strict'

    const URL = `https://discord.com/api/webhooks/1070330527443329074/KSEhjGiAwWTWa0VCVXokGFjzqcobVb4Oa3ZvuZgRdMqFm4AkxBzJHiMJ1K1zIhskbSsO`;
    const postData = {
        username: 'animal_avatar_maker',
        content: 'Waitingリストに追加されました。'
    }

    const main = async () => {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });
    
        // const json = await response.json();
        console.log(response.status);
    }
    
    await main();
    res.status(200).json({
        message: "ok"
    })
};


