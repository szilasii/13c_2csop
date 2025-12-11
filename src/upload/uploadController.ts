import dotenv from "dotenv"
import config from "../config/config"
//import fs from "fs"
import { uploadMiddleware, uploadMiddlewareMultiple } from "../middleware/upload"
import { File, IFile, IMulterFile } from "../file/file"
import mysql from "mysql2/promise"
dotenv.config()

export const getFileList = async (req: any, res: any) => {
    const connection = await mysql.createConnection(config.database);
    //const uploadPath = config.baseDir + config.uploadDir

    const [results]: any = await connection.query(
        "Select * from files join userFiles on userFiles.fileId = files.fileId where userFiles.userId=? ", [req.user.userId]
    )
    if (results.length === 0) {
        return res.status(200).send("Nincs megjelenítendő adat!")
    }

    const fileInfos: any[] = []
    results.map((file: IFile) => {
        fileInfos.push({ name: file.fileName, url: "http://localhost:3000/file/" + file.fileId })
    })


    res.status(200).send(fileInfos)



}
export const downloadFile = async (req: any, res: any) => {
    const filename: string = req.params.id
    const dirPath = config.baseDir + config.uploadDir
    const connection = await mysql.createConnection(config.database);
    const [results]: any = await connection.query(
       "Select * from files join userFiles on userFiles.fileId = files.fileId where userFiles.userId = ? and files.fileId = ?", [req.user.userId,filename]
    )
    if (results.length === 0) {
        return res.status(500).send("Nincs meg a file!")
    }

    res.download(dirPath + filename, results[0].fileName, (err: any) => {
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
        const file: File = new File(req.file, req.user.userId)
        await file.saveToDatabase()

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
        req.files.map(async (file: IMulterFile) => {
            const newFile: File = new File(file, req.user.userId)
            await newFile.saveToDatabase()

        })


        res.status(200).send({ message: `A fájl feltöltése sikerült! ${req.files}` })
    }
    catch (err) {
        res.status(500).send({
            error: `A fájl feltöltés nem sikerült!  ${req.files}` + err
        })
    }
}