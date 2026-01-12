import dotenv from "dotenv"
import config from "../config/config"
import mysql from "mysql2/promise"
import { uploadMiddleware, uploadMiddlewareMultiple } from "../middleware/upload"
import { File, IMulterFile } from "../file/file"
dotenv.config()

export const getFileList = async (req: any, res: any) => {
    const connection = await mysql.createConnection(config.database);
    try {
        const [results]: any = await connection.query(
            "Select * from files join userFiles on userFiles.fileId = files.fileId where userFiles.userId = ?", [req.user.userId]
        );

        if (results.length === 0) {
            return res.status(404).send({ message: "Nincs megjelenítendő adat!" })
        }

        const fileInfos: any[] =[]
        results.map((file:any) => {
            fileInfos.push({ name: file.fileName, url: "http://localhost:3000/file/" + file.fileId})
        })

        res.status(200).send(fileInfos)
    } catch (err) {
        console.log(err)
    }




    // const uploadPath = config.baseDir + config.uploadDir

    // fs.readdir(uploadPath, function (err, files) {
    //     if (err) {
    //         console.log(err)
    //         res.status(500).send({ message: "Hiba a fájlok olvasásakor!" })
    //     }
    //     const fileInfos: any[] = []
    //     files.forEach(file => {
    //         fileInfos.push({ name: file, url: "http://localhost:3000/file/" + file })
    //     });
    //     res.status(200).send(fileInfos)
    // })


}
export const downloadFile = async  (req: any, res: any) => {
    const fileId: string = req.params.id

    const connection = await mysql.createConnection(config.database);
    const [results]: any = await connection.query(
        "Select fileName from files where fileId=? ", [fileId]
    )
    if (results.length === 0) {
        return res.status(500).send("Nincs meg a file!")
    }


    const dirPath = config.baseDir + config.uploadDir
    res.download(dirPath + fileId, results[0].fileName, (err: any) => {
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

        const file = new File(req.file as IMulterFile, req.user.userId)
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

        const badFile: any[] = []
        await Promise.all(
            req.files.map(async (file: IMulterFile) => {
                const newFile = new File(file as IMulterFile, req.user.userId)

                try {
                    await newFile.saveToDatabase()
                } catch (err) {
                    badFile.push(file)
                }

            }))
        const diff = req.files.filter((itemA: any) => !badFile.some(itemB => itemB.filename === itemA.filename))
        res.status(200).send({ message: `Az alábbi fájlok feltöltése sikerült! `, diff })

    }
    catch (err) {
        res.status(500).send({
            error: `A fájl feltöltés nem sikerült!  ${req.files}` + err
        })
    }
}