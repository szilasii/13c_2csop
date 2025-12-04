import config from "../config/config"
import mysql from "mysql2/promise"

export interface IFile {
    fileId : string
    fileName : string
    uploadTime?: Date | null
    mimeType: string 
    fileSize: number
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
    fileId : string
    fileName : string
    uploadTime?: Date | null
    mimeType: string 
    fileSize: number
    userId: number

    getalldata = () => {
        return this
    }

     constructor (file:IMulterFile, userId: number) {
            this.fileId = file.filename
            this.fileName = file.originalname
            this.mimeType = file.mimetype
            this.fileSize = file.size
            this.userId = userId
     }

     async saveToDatabase () {
         const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            "insert into files values (?,?,?,?,?)", [this.fileId,this.fileName,null,this.mimeType,this.fileSize]
        ) as Array<any>

        
        if (results.affectedRows > 0) {
            return
        }
    } catch (err) {
        
        console.log(err);
    }
     }
}