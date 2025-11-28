import { Router } from "express"
import { deleteDataFromId, getAllData, getDataFromId, insertData, patchData, putData } from "./dogController"
import verifyToken from "../middleware/auth"
//import verifyToken from "./auth"

const router: Router = Router()


router.get('/dogs', verifyToken, getAllData)
router.get('/dogs/:id',getDataFromId)
router.post('/dogs',insertData)
router.delete('/dogs/:id',deleteDataFromId)
router.put('/dogs/:id',putData)
router.patch('/dogs/:id',patchData)

export default router