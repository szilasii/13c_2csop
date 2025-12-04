import dotenv from "dotenv"
import config from "../config/config"
import fs from "fs"
import { uploadMiddleware, uploadMiddlewareMultiple } from "../middleware/upload"
dotenv.config()

export const getFileList = (_req: any, res: any) => {

    const uploadPath = config.baseDir + config.uploadDir

    fs.readdir(uploadPath, function (err, files) {
        if (err) {
            console.log(err)
            res.status(500).send({ message: "Hiba a fájlok olvasásakor!" })
        }
        const fileInfos: any[] = []
        files.forEach(file => {
            fileInfos.push({ name: file, url: "http://localhost:3000/file/" + file })
        });
        res.status(200).send(fileInfos)
    })


}
export const downloadFile = (req: any, res: any) => {
    const filename: string = req.params.id
    const dirPath = config.baseDir + config.uploadDir
    res.download(dirPath + filename, filename, (err: any) => {
        if (err) {
            res.status(500).send({
                error: "A fájl nem tölthető le!" + err
            })
        }
    })

}
export const uploadFile = async (req: any, res: any) => {
    try {
        await uploadMiddleware(req, res)
        if (req.file === undefined) {
            return res.status(400).send({ error: "Töltsön fel fájlt!" })
        }


        res.status(200).send({ message: `A fájl feltöltése sikerült! ${req.file.originalname}` })
    }
    catch (err) {
        res.status(500).send({
            error: `A fájl feltöltés nem sikerült!  ${req.file.originalname}` + err
        })
    }

}
export const uploadFileMultiple = async (req: any, res: any) => {
    try {
        await uploadMiddlewareMultiple(req, res)
        if (req.files === undefined) {
            return res.status(400).send({ error: "Töltsön fel fájlokat!" })
        }
        console.log(req.files)
        res.status(200).send({ message: `A fájl feltöltése sikerült! ${req.files}` })
    }
    catch (err) {
        res.status(500).send({
            error: `A fájl feltöltés nem sikerült!  ${req.files}` + err
        })
    }
}