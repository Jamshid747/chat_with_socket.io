import { AuthenticationError, ValidationError } from "#errors"
import { Op } from "sequelize"
import sha256 from "sha256"
import path from "path"
import JWT from "#JWT"

const GET_AVATAR = async (req, res, next) => {
    try {
        const user = await req.models.User.findOne({ where: { userId: req.userId }})
        res.sendFile(path.join(process.cwd(), 'uploads', user.userImg))
    } catch (error) {
        next(error)
    }
}

const GET_USERSNAME = async (req, res, next) => {
    try {
        const user = await req.models.User.findOne({ where: { userId: req.userId }})
        res.setHeader('Content-Type', 'plain/text')
        res.send(user.username)
    } catch (error) {
        next(error)
    }
}

const GET_FILE = async (req, res, next) => {
    try {
        res.sendFile(path.join(process.cwd(), 'uploads', req.params.fileName))
    } catch (error) {
        next(error)
    }
}

const DOWNLOAD_FILE = async (req, res, next) => {
    try {
        res.download(path.join(process.cwd(), 'uploads', req.params.fileName))
    } catch (error) {
        next(error)
    }
}

export default {
    GET_USERSNAME,
    DOWNLOAD_FILE,
    GET_AVATAR,
    GET_FILE
}