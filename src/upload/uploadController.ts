import dotenv from "dotenv"
import config from "../config/config"
import fs from "fs"
dotenv.config()

export const getFileList = (_req:any, res:any) => {

const uploadPath = config.baseDir + config.uploadDir

    fs.readdir(uploadPath,function (err,files) {
        if (err) {
            console.log(err)
            res.status(500).send({message: "Hiba a fájlok olvasásakor!"})
        }
        const fileInfos:any[] = []
        files.forEach(file => {
            fileInfos.push({name: file, url: "http://localhost:3000/"+ file})
        });
        res.status(200).send(fileInfos)    
    })
   

 }
export const downloadFile = (_req:any, _res:any) => {

 }
export const uploadFile = (_req:any, _res:any) => { 

}
export const uploadFileMultiple = (_req:any, _res:any) => {

 }