const GET_LOGIN = (req, res, next) => {
    try {
       res.render('login') 
    } catch (error) {
        next(error)
    }
}

const GET_REGISTER = (req, res, next) => {
    try {
       res.render('register') 
    } catch (error) {
        next(error)
    }
}

export default {
    GET_REGISTER,
    GET_LOGIN
}