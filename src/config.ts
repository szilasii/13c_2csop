import dotenv from "dotenv"
dotenv.config()

class DBConfig {
 constructor () {
    return {host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DATABASE}
 }
}

const config : any  = {
    database: new DBConfig()
}
export default config