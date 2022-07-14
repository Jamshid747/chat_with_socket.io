import { AuthenticationError } from "#errors"
import JWT from "#JWT"

export default async (req, res, next) => {
    try {
        let token = req.headers.token 
        if(!token) token = req.params.token

        if(!token) {
            throw new AuthenticationError("Token is required!")
        }

        const { userId, agent } = JWT.verify(token)

        if(req.headers['user-agent'] != agent) {
            throw new AuthenticationError('Tokent is sent from wrong device!')
        }

        const user = await req.models.User.findOne({ where: { userId } })

        if(!user) {
            throw new AuthenticationError('Invalid token!')
        }

        req.userId = userId
        next()
    } catch (error) {
        next(error)
    }
}