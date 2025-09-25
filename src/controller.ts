import data from "./data"

export function root(_req:any,res:any) {
    res.send("Fut a szerver")

}


export function getAllData(_req:any,res:any) {

    res.status(200).send(data)

}