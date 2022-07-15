import { AuthenticationError, ValidationError } from "#errors"
import { Op } from "sequelize"
import sha256 from "sha256"
import path from "path"
import JWT from "#JWT"

const GET_MESSAGES = async (req, res, next) => {
    try {
        let messages = await req.models.Message.findAll({
            where: {
                [Op.or]: [
                    { messageFrom: req.userId, messageTo: req.query.userId },
                    { messageFrom: req.query.userId, messageTo: req.userId }

                ]
            },
            order: [
                ['messageId', 'ASC']
            ]
        }) 

        messages = await Promise.all(JSON.parse(JSON.stringify(messages)).map(async message => {
            message.messageFrom = await req.models.User.findOne({
                where: {
                    userId: message.messageFrom
                },
                attributes: { exclude: ['password'] }
            })

            message.messageTo = await req.models.User.findOne({
                where: {
                    userId: message.messageTo
                },
                attributes: { exclude: ['password'] }
            })

            return message
        }))

        return res.send(messages)
    } catch (error) {
        next(error)
    }
}

const POST_MESSAGES = async (req, res, next) => {
    try {
        const { messageBody, userId } = req.body

        let message;
        if(req.files) {
            const { file } = req.files
            
            if(!file) {
                throw new ValidationError('file is required!')
            }

            if(file.size > 1024 * 1024 * 50) {
                throw new ValidationError('File size is too large (limit 50 mb)! ')
            }

            const [, extname] = file.mimetype.split('/')
            const fileName = Date.now() + '.' + extname

            file.mv(path.join(process.cwd(), 'uploads', fileName))

            message = {
                messageFrom: req.userId,
                messageTo: userId,
                messageBody: fileName,
                messageType: file.mimetype
            }
        } else {
            message = {
                messageFrom: req.userId,
                messageTo: userId,
                messageBody,
                messageType: 'plain/text'
            }
        }

        const record = await req.models.Message.create(message, { returning: true })

        record.messageFrom = await req.models.User.findOne({
            where: {
                userId: record.messageFrom
            },
            attributes: { exclude: ['password'] }
        })

        record.messageTo = await req.models.User.findOne({
            where: {
                userId: record.messageTo
            },
            attributes: { exclude: ['password'] }
        })

        return res.status(200).json({
            status: 200,
            message: "The message is sent!",
            data: record
        })
    } catch (error) {
        next(error)
    }
}

export default {
    POST_MESSAGES,
    GET_MESSAGES
}