import app from "./app"
import dotenv from "dotenv"
dotenv.config()  // dotenv inicializálása

const PORT = process.env.PORT || 3000 //Amennyiben nem tudja beolvasni az .env fájlból a PORT változó értékét akkor a default értéket használja
// Szerver futtatása
app.listen(PORT,()=>{
    console.log(`A szerver a ${PORT}-on fut`)
})