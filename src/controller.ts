
import { Request, Response } from "express"
import Dog, { IDog } from "./dog"
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
        ) as Array<any>

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

    let dog: Dog = new Dog(req.body as IDog)

    if (dog.name === "" || dog.breed === "") {
        res.status(400).send({ error: 400, messege: "Nem küldte el az adatokat megfelelően!" })
        return
    }

    const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            "insert into dog values (null,?,?,?,?,?)", [dog.name, dog.breed, dog.breed ? 1 : 0, parseInt(dog.age as unknown as string), dog.picurl]
        ) as Array<any>
        if (results.affectedRows > 0) {
            res.status(201).send(`Sikeres adatrőgzités az id-ja : ${results.insertId}`)
            return
        }



    } catch (err) {
        console.log(err);
    }
    res.status(404).send("Sikertelen adatrögzítés")
}

export const deleteDataFromId = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)

    if (isNaN(id)) {
        res.status(400).send({ error: 400, message: "Hibás formátumú azonosító!" })
        return
    }
    const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            "delete from dog where id=?", [id]
        ) as Array<any>
        if (results.affectedRows > 0) {
            res.status(204).send(`Sikeres törölt ${results.affectedRows} elemet`)
            return
        }

    } catch (err) {
        console.log(err);
    }
    res.status(404).send("Sikertelen törlés")

}

export const putData = async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send({ error: 400, message: "Hibás formátumú azonosító!" })
        return
    }


    if (!req.body) {

        res.status(400).send({ error: 102, messege: "Nem küldte el az adatokat megfelelően!" })
        return
    }

    const dog :any = new Dog(req.body as IDog)
    
    const allowedFields = ['name','breed','gender','age','picurl'] 

    const keys = Object.keys(dog).filter(key => allowedFields.includes(key))
    
    if (keys.length === 0 ) {
        res.status(400).send({ error: 103, messege: "Nincs frissítendő mező!" })
        return
    }
   
    const updateString = keys.map(key => `${key} = ?`).join(', ')
   const values = keys.map (key => dog[key])
    values.push(id)
    const sql = `update dog set ${updateString} where id = ?`
    
    const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            sql, values
        ) as Array<any>
        if (results.affectedRows > 0) {
            res.status(201).send(`Sikeresen módosított ${results.affectedRows} elemet`)
            return
        }
        insertData(req,res)
    } catch (err) {
        console.log(err);
    }


}

export const patchData = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send({ error: 400, message: "Hibás formátumú azonosító!" })
        return
    }


    if (!req.body) {

        res.status(400).send({ error: 102, messege: "Nem küldte el az adatokat megfelelően!" })
        return
    }

    const dog :any = new Dog(req.body as IDog)
    
    const allowedFields = ['name','breed','gender','age','picurl'] 

    const keys = Object.keys(dog).filter(key => allowedFields.includes(key))
    
    if (keys.length === 0 ) {
        res.status(400).send({ error: 103, messege: "Nincs frissítendő mező!" })
        return
    }
   
    const updateString = keys.map(key => `${key} = ?`).join(', ')
   const values = keys.map (key => dog[key])
    values.push(id)
    const sql = `update dog set ${updateString} where id = ?`
    
    const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            sql, values
        ) as Array<any>
        if (results.affectedRows > 0) {
            res.status(201).send(`Sikeresen módosított ${results.affectedRows} elemet`)
            return
        }

    } catch (err) {
        console.log(err);
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