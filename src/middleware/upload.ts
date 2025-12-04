import dotenv from "dotenv"
import multer from "multer"
import util from "util"
import config from "../config/config"
dotenv.config()



const storage = multer.diskStorage({
    destination: (_req,_file,cb) => {
        cb(null,config.baseDir + config.uploadDir)
    }
})

const uploadFile = multer ({
    storage: storage,
    limits:{fileSize: config.maxSize}
}).single("file")

const uploadFiles =  multer ({
    storage: storage,
    limits:{fileSize: config.maxSize}
}).array("files",10)

export const uploadMiddleware = util.promisify(uploadFile)
export const uploadMiddlewareMultiple = util.promisify(uploadFiles)