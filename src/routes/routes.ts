import { Router } from "express"
import { root } from "../dog/dogController"

const router: Router = Router()
router.get('/',root)

export default router