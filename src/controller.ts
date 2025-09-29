

import data from "./data"
import { Request, Response } from "express"
import Dog from "./dog"

export function root(_req: Request, res: Response) {
    res.send("Fut a szerver")

}


export function getAllData(_req: Request, res: Response) {

    res.status(200).send(data)

}

export function getDataFromId(req:Request, res: Response) {
    const id = parseInt(req.params.id)    
    const result = data.find(i => i.id === id )    
    if (result) {
       res.status(200).send(result)
       return
    }
    
    res.status(404).send("Nincs ilyen elem")

}

export function  insertData( req:Request, res: Response) {
    
    if(!req.body) {

        res.status(400).send("Nem küldte el az adatokat megfelelően!")
        return
    }

     let dog:Dog = new Dog(req.body)       
     console.log(req.body) 
    
    if (dog.nev === "" || dog.fajta ==="") {
        res.status(400).send("Nem küldte el az adatokat megfelelően!")
        return
    }
    
    
     dog.id = Math.max(...data.map(e => e.id)) + 1
     data.push(dog)
    
     res.status(201).send("Sikeres adatrögzítés!")
    
     //console.log(data)
}