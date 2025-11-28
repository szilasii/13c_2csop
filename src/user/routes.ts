import { Router } from "express"
import { signIn } from "../user/userController"

const router: Router = Router()
router.post('/user/signin',signIn)

export default router