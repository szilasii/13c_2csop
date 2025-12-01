import express from "express"
import router from "../routes/routes"
import dogRouter from "../dog/routes"
import userRouter from "../user/routes"
import uploadRouter from "../upload/routes"
import cors from "cors"
import bodyParser from "body-parser"

const app = express()
app.use(cors({origin:'*'}))

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/',router)
app.use('/', dogRouter)
app.use('/',userRouter)
app.use('/',uploadRouter)

export default app

