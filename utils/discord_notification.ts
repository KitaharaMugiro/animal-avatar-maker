
export const discord_notification = async (message: String) => {
    const URL = `https://discord.com/api/webhooks/1070330527443329074/KSEhjGiAwWTWa0VCVXokGFjzqcobVb4Oa3ZvuZgRdMqFm4AkxBzJHiMJ1K1zIhskbSsO`;
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