import data from "./data"
import { Request, Response } from "express"

export function root(_req: Request, res: Response) {
    res.send("Fut a szerver")

}


export function getAllData(_req: Request, res: Response) {

    res.status(200).send(data)

}

export function getDataFromId(req:Request, res: Response) {
    const id = parseInt(req.params.id)    
    
    res.status(200).send(data[id])

}