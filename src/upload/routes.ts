import { Router } from "express"
import { getFileList, downloadFile, uploadFile, uploadFileMultiple } from "./uploadController"
//import verifyToken from "../middleware/auth"

const router: Router = Router()
router.get('/files', getFileList)
router.get('/file/:id', downloadFile)
router.post('/file/upload',uploadFile)
router.post('/files/upload',uploadFileMultiple)


export default router