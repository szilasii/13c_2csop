import config from "../config/config"
import mysql from "mysql2/promise"
import jwt from "jsonwebtoken"

export const signIn = async (req:any,res:any) => {
    const {email,password} = req.body
    if (!(email && password)) {
        return res.status(400).send({error: "Nem megfelelően megadott adatok!"})
    }

    const connection = await mysql.createConnection(config.database) 
    try {
        const [results] = await connection.query('select login(?,?) as id',[email,password]) as Array<any>

        if (!results[0].id) {
            return res.status(401).send({error:"Nem megfelelő felhasználónév vagy jelszó!"})
        }
        if (!config.jwtSecret) {
            return res.status(400).send({error: "Hiba a titkos kulcsnál!"})
        }
        const token = jwt.sign({id:results[0].id},config.jwtSecret,{expiresIn:"2h"})


        res.status(200).send({token:token})
    } catch (e) {
        console.log(e)
    }
} 