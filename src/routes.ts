import { Router } from "express"
import { getAllData, getDataFromId, insertData, root } from "./controller"

const router: Router = Router()

router.get('/',root)
router.get('/dogs',getAllData)
router.get('/dogs/:id',getDataFromId)
router.post('/dogs',insertData)

export default router