
import { Request, Response } from "express"
import Dog from "./dog"
import config from "./config"
import mysql from "mysql2/promise"

export function root(_req: Request, res: Response) {
    res.send("Fut a szerver")

}


export async function getAllData(_req: Request, res: Response) {

   
    const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            'SELECT * FROM dog'
        )as Array<any>

        if (results.length > 0) {
            res.status(200).send(results);
            return
        }
        res.status(404).send("Nincs ilyen elem")
    } catch (err) {
        console.log(err);
    }
}

export async function getDataFromId(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send({ error: 103, message: "Hibás formátumú azonosító!" })
        return
    }
    const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            'SELECT * FROM dog where id = ?', [id]
        ) as Array<any>

        if (results.length > 0) {
            res.status(200).send(results);
            return
        }
        res.status(404).send("Nincs ilyen elem")

    } catch (err) {
        console.log(err);
    }

    //

}

export async function insertData(req: Request, res: Response) {



    if (!req.body) {

        res.status(400).send({ error: 102, messege: "Nem küldte el az adatokat megfelelően!" })
        return
    }

    let dog: Dog = new Dog(req.body as Partial<Dog>)

    if (dog.nev === "" || dog.fajta === "") {
        res.status(400).send({ error: 400, messege: "Nem küldte el az adatokat megfelelően!" })
        return
    }

    const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            "insert into dog values (null,?,?,?,?,?)", [dog.nev, dog.fajta, dog.nem ? 1:0, (dog.eletkor as unknown as string), dog.kepUrl]
        ) as Array<any>
        console.log(results)

        res.status(404).send("Nincs ilyen elem")

    } catch (err) {
        console.log(err);
    }

}

export const deleteDataFromId = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)

    if (isNaN(id)) {
        res.status(400).send({ error: 400, message: "Hibás formátumú azonosító!" })
        return
    }

    res.status(204).send()

}

export const putData = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)

    if (isNaN(id)) {
        res.status(400).send({ error: 400, message: "Hibás formátumú azonosító!" })
        return
    }


    if (!req.body) {

        res.status(400).send({ error: 102, messege: "Nem küldte el az adatokat megfelelően!" })
        return
    }


}

export const patchData = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send({ error: 400, message: "Hibás formátumú azonosító!" })
        return
    }


    if (!req.body) {

        res.status(400).send({ error: 102, messege: "Nem küldte el az adatokat megfelelően!" })
        return
    }



    //let reqDog: Dog = new Dog(req.body as unknown as Dog)

    // data[index].nev = reqDog.nev || data[index].nev
    // data[index].fajta  = reqDog.fajta || data[index].fajta
    // data[index].eletkor  = reqDog.eletkor || data[index].eletkor
    // data[index].nem  = reqDog.nem || data[index].nem
    // data[index].kepUrl  = reqDog.kepUrl || data[index].kepUrl
    //  Object.assign(data[index], {
    //     nev: reqDog.nev || data[index].nev,
    //     fajta: reqDog.fajta || data[index].fajta,
    //     eletkor: reqDog.eletkor || data[index].eletkor,
    //     nem: reqDog.nem || data[index].nem,
    //     kepUrl: reqDog.kepUrl || data[index].kepUrl
    // })

    //  for (const key in reqDog) {
    //     const k = key as keyof Dog
    //     if (reqDog[k] !== undefined) {
    //         data[index][key]  = reqDog[k]
    //     }
    // }
    // reqDog.id = id
    // console.log(reqDog)
    // console.log(data[index])
    // console.log({ ...data[index], ...reqDog})

    // console.log(data[index])    


}




// function applyPatch<T extends object>(target: T, patch: Partial<T>) {
//   (Object.keys(patch) as Array<keyof T>).forEach((k) => {
//     const v = patch[k];
//     if (v !== undefined && v !== null && v !== '') {
//       target[k] = v as T[typeof k];
//     }
//   })
// }