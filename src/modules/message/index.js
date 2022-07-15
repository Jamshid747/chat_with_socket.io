import validation from "../../middlewares/validation.js"
import checkToken from "../../middlewares/checkToken.js"
import { Router } from "express"
import CT from "./controller.js"

const router = Router()

router.get('/messages', checkToken, validation, CT.GET_MESSAGES)
router.post('/messages', checkToken, validation, CT.POST_MESSAGES)

export default router
