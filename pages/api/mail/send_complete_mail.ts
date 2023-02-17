export default async (req, res) => {
    const { user_id, email } = req.body;
    const nouhinUrl = `https://uchinoko.yunomy.com/${user_id}`

    const AWS = require('aws-sdk');
    console.log({ nouhinUrl })
    console.log({ key: process.env.AWS_API_KEY })
    console.log({ secret: process.env.AWS_SECRET_API_KEY })
    AWS.config.update({
        accessKeyId: process.env.AWS_API_KEY,
        secretKey: process.env.AWS_SECRET_API_KEY,
        region: 'ap-northeast-1'
    });
    const ses = new AWS.SES();

    const params = {
        Destination: {
            ToAddresses: [
                email
            ],
        },
        Message: {
            Body: {
                Text: {
                    Data: `
                    アバターの作成が完了したのでお届けいたします！
                    URL: ${nouhinUrl}
    
                    お気に入りのアバターがありましたら感想ツイートを #アニマルアバターメーカー　のタグを付けていただけると嬉しいです！
                    `,
                    Charset: 'utf-8'
                },
                Html: {
                    Data: `
                    <h3>アバターの作成が完了したのでお届けいたします！</h3>
                    <p>URL: <a href='${nouhinUrl}'>${nouhinUrl}</a></p>
                    <br/>
                    <p>お気に入りのアバターがありましたら感想ツイートを <a href='https://twitter.com/search?q=%23%E3%82%A2%E3%83%8B%E3%83%9E%E3%83%AB%E3%82%A2%E3%83%90%E3%82%BF%E3%83%BC%E3%83%A1%E3%83%BC%E3%82%AB%E3%83%BC'>#アニマルアバターメーカー</a>　のタグを付けていただけると嬉しいです！</p>
                    `,
                    Charset: 'utf-8',
                }
            },
            Subject: {
                Data: "【アニマルアバターメーカー】アバターができました！",
                Charset: 'utf-8',
            },
        },
        // From
        Source: 'noreply@animal-avatar-maker.yunomy.com',
    };

    ses.sendEmail(params, (err, r) => {
        if (err) {
            console.log(err);
            res.status(500).json(err)
        }
        console.log(r);
        res.status(200).json(r)
    });

    //res.status(200).json()
};
