import { Router } from "express"
import { getAllData, root } from "./controller"

const router: Router = Router()

router.get('/',root)
router.get('/user',getAllData)

export default router