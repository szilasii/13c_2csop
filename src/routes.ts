import { Router } from "express"
import { getAllData, getDataFromId, root } from "./controller"

const router: Router = Router()

router.get('/',root)
router.get('/dog',getAllData)
router.get('/dog/:id',getDataFromId)

export default router