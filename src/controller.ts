
import { Request, Response } from "express"
import Dog, { IDog } from "./dog"

export function root(_req: Request, res: Response) {
    res.send("Fut a szerver")

}


export function getAllData(_req: Request, res: Response) {

    res.status(200).send(data)

}

export function getDataFromId(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send({ error: 103, message: "Hibás formátumú azonosító!" })
        return
    }
    const result = data.find(i => i.id === id)
    if (result) {
        res.status(200).send(result)
        return
    }

    res.status(404).send("Nincs ilyen elem")

}

export function insertData(req: Request, res: Response) {



    if (!req.body) {

        res.status(400).send({ error: 102, messege: "Nem küldte el az adatokat megfelelően!" })
        return
    }

    let dog: Dog = new Dog(req.body as Partial<Dog>)

    if (dog.nev === "" || dog.fajta === "") {
        res.status(400).send({ error: 400, messege: "Nem küldte el az adatokat megfelelően!" })
        return
    }

    dog.id = Math.max(...data.map(e => e.id as number)) + 1
    data.push(dog)
    res.status(200).send({ success: "Sikeres adatrögzítés!", data: dog })

}

export const deleteDataFromId = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)

    if (isNaN(id)) {
        res.status(400).send({ error: 400, message: "Hibás formátumú azonosító!" })
        return
    }
    const index = data.findIndex(i => i.id === id)
    if (index === -1) {
        res.status(404).send({ error: 404, message: "Nem található ilyen azonosítójú elem" })
        return
    }
    data.splice(index, 1)
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

    const index = data.findIndex(i => i.id === id)
    if (index === -1) {
        insertData(req, res)
        return
    }

    let dog: Dog = new Dog(req.body as IDog)
    if (dog.nev === "" || dog.fajta === "") {
        res.status(400).send({ error: 400, messege: "Nem küldte el az adatokat megfelelően!" })
        return
    }

    dog.id = id
    data[index] = dog as Dog
    res.status(201).send(data)
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

    const index:number = data.findIndex(i => i.id === id)
    if (index === -1) {
        res.status(404).send({ error: 404, message: "Nem található ilyen azonosítójú elem" })
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

applyPatch(data[index], req.body as Partial<Dog>)

 res.status(201).send(data)
}




function applyPatch<T extends object>(target: T, patch: Partial<T>) {
  (Object.keys(patch) as Array<keyof T>).forEach((k) => {
    const v = patch[k];
    if (v !== undefined && v !== null && v !== '') {
      target[k] = v as T[typeof k];
    }
  })
}