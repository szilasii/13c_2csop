import config from "../config/config"
import mysql from "mysql2/promise"
import fs from "fs"

export interface IFile {
    fileId?: string
    fileName?: string
    uploadTime?: Date | null
    mimeType?: string
    fileSize?: number
}

export interface IMulterFile {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}

export class File implements IFile {
    fileId?: string
    fileName?: string
    uploadTime?: Date | null
    mimeType?: string
    fileSize?: number
    userId?: number

    getalldata = () => {
        return this
    }

    constructor(file?: IMulterFile, userId?: number) {
        if (file && userId) {
            this.setData(file, userId)
        }
        this.fileId = file?.filename
        this.fileName = file?.originalname
        this.mimeType = file?.mimetype
        this.fileSize = file?.size
        this.userId = userId
    }

    setData(file: IMulterFile, userId: number) {
        this.fileId = file.filename
        this.fileName = file.originalname
        this.mimeType = file.mimetype
        this.fileSize = file.size
        this.userId = userId
    }
    async loadDataFromDb(fileId: string) {
        try {
            const connection = await mysql.createConnection(config.database)
            const [results]:any = await connection.query(
                "select * from files where fileId=?", [fileId])
            Object.assign(this, results[0] as Partial<IFile>)

        } catch (err) {
            throw err
        }

    }

    async deleteFromDatabaseAndDir() {
        try {
            const connection = await mysql.createConnection(config.database)
            const result = await connection.query(
                "delete from files where fileId=?", [this.fileId])
            Object.assign(this, result[0] as Partial<IFile>)
            this.deleteFileDir()

        } catch (err) {
            throw err
        }
    }
    async saveToDatabase() {
        const connection = await mysql.createConnection(config.database);

        try {
            connection.beginTransaction()
            if (!this.userId) {
                throw "Nem található userId"
            }
            let [results]: any = await connection.query(
                "insert into files (fileId,fileName,mimeType,fileSize) values (?,?,?,?)", [this.fileId, this.fileName, this.mimeType, this.fileSize]
            )

            if (results.affectedRows === 0) {
                throw "Hiba a Files táblába történő mentéskor!"
            }

            [results] = await connection.query(
                "insert into userFiles values (?,?)", [this.userId, this.fileId]
            )

            if (results.affectedRows === 0) {
                throw "Hiba a userFiles táblába történő mentéskor!"
            }
            connection.commit()
        } catch (err) {
            this.deleteFileDir()
            connection.rollback()
            throw err
        }
    }
    deleteFileDir() {
        try {
            fs.unlinkSync(config.baseDir + config.uploadDir + this.fileId)
        } catch (err) {
            throw err
        }
    }
}