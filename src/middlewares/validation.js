import { USER_LOGIN_VALIDATION, USER_REGISTER_VALIDATION, GET_MESSAGE_VALIDATION, POST_MESSAGE_VALIDATION } from "#validation"
import { ValidationError } from "#errors"

export default (req, res, next) => {
    try {
        if(req.url == "/login" && req.method == "POST") {
            const { error } = USER_LOGIN_VALIDATION.validate({ body: req.body })
            if(error) {
                throw new ValidationError(error.message)
            }
        }

        if(req.url == "/register" && req.method == "POST") {
            const { error } = USER_REGISTER_VALIDATION.validate({ body: req.body })
            if(error) {
                throw new ValidationError(error.message)
            }
        }

        if(req.url == "/messages" && req.method == "GET") {
            const { error } = GET_MESSAGE_VALIDATION.validate({ query: req.query })
            if(error) {
                throw new ValidationError(error.message)
            }
        }

        if(req.url == "/messages" && req.method == "POST") {
            const { error } = POST_MESSAGE_VALIDATION.validate({ body: req.body })
            if(error) {
                throw new ValidationError(error.message)
            }
        }

        return next()
    } catch (error) {
        next(error)
    }
}