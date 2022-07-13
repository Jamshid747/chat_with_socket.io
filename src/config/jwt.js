import { AuthorizationError, InternalServerError } from "#errors"
import JWT from "jsonwebtoken"

export default {
    sign: payload => {
        try {
            JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 30 })
        } catch (error) {
            throw new InternalServerError(error.message)
        }
    },

    verify: token => {
        try {
            JWT.verify(token, process.env.JWT_SECRET)

        } catch (error) {
            throw new AuthorizationError(error.message)
        }
    }
}