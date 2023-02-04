
export const discord_notification = async (message: String) => {
    //環境変数から取得
    const URL = process.env.DISCORD_WEBHOOK_URL;
    const postData = {
        username: 'animal_avatar_maker',
        content: message
    }


    await fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
    });
}