import sha256 from "sha256"

export default async ({ sequelize }) => {
    const user = await sequelize.models.User.findOne()
    if(!user) await sequelize.models.User.bulkCreate([
        {
            username: 'Jamshid',
            userImg: 'jamshid.jpg',
            password: sha256('olma')
        },
        {
            username: 'Zayniddin',
            userImg: 'zayni.jpg',
            password: sha256('olma')
        },
        {
            username: 'Bahrom',
            userImg: 'bahrom.jpg',
            password: sha256('olma')
        },
    ])

    const message = await sequelize.models.Message.findOne()
    if(!message) await sequelize.models.Message.bulkCreate([
        {
            messageFrom: 1,
            messageTo: 2,
            messageBody: "Salom Zayniddin",
            messageType: 'plain/text'
        },
        {
            messageFrom: 2,
            messageTo: 1,
            messageBody: "Salom Jamshid, qalesan? nima gapla?",
            messageType: 'plain/text'
        },
        {
            messageFrom: 1,
            messageTo: 2,
            messageBody: "Tinch yurimmiz, mambi videoni ko'rvoq",
            messageType: 'plain/text'
        },
        {
            messageFrom: 1,
            messageTo: 2,
            messageBody: "video.mp4",
            messageType: 'video/mp4'
        },
        {
            messageFrom: 2,
            messageTo: 3,
            messageBody: "officega kelasanmi?",
            messageType: 'plain/text'
        },
        {
            messageFrom: 3,
            messageTo: 2,
            messageBody: "Yo'q bormiman",
            messageType: 'plain/text'
        },
        {
            messageFrom: 3,
            messageTo: 1,
            messageBody: "Do'ta o'ynimizmi?",
            messageType: 'plain/text'
        },
        {
            messageFrom: 1,
            messageTo: 3,
            messageBody: "Mayli",
            messageType: 'plain/text'
        }
    ])
}