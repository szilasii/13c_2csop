import { WebSocketServer } from "ws"
const wss= new WebSocketServer({port: 8080})

wss.on("connection", (socket) => {
    console.log("Ez a szerver")
    socket.send("Szia kliens! Ez a szerver.")
    socket.on("message",(msg)=>{
        console.log(`A kliens üzenete: ${msg.toString()}`)
        socket.send(`Ezt az üzit küldted:  ${msg.toString()}`)
    })
})