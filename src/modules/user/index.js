import { Router } from "express"
import CT from "./controller.js"

const router = Router()

router.get('/login', CT.GET_LOGIN)
router.get('/register', CT.GET_REGISTER)

export default router
