import { Router } from "express"
import { deleteDataFromId, getAllData, getDataFromId, insertData, patchData, putData, root } from "./controller"

const router: Router = Router()

router.get('/',root)
router.get('/dogs',getAllData)
router.get('/dogs/:id',getDataFromId)
router.post('/dogs',insertData)
router.delete('/dogs/:id',deleteDataFromId)
router.put('/dogs/:id',putData)
router.patch('/dogs/:id',patchData)

export default router