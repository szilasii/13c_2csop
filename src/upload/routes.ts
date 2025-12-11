import { Router } from "express"
import { getFileList, downloadFile, uploadFile, uploadFileMultiple } from "./uploadController"
import verifyToken from "../middleware/auth"

const router: Router = Router()
router.get('/files', verifyToken,getFileList)
router.get('/file/:id', verifyToken,downloadFile)
router.post('/file/upload',verifyToken,uploadFile)
router.post('/files/upload',verifyToken,uploadFileMultiple)


export default router