import { WebSocketServer } from "ws"
const wss= new WebSocketServer({port: 8080})
const clients = new Set()

wss.on("connection", (socket) => {
    clients.add(socket)
    socket.send('Csatlakoztal!')
    socket.on("message",(msg)=>{
       broadcast(msg.toString())
    })
    socket.on('close', ()=>{
        clients.delete(socket)
    })


    const broadcast = (message:any)=> {
        clients.forEach((client:any)=>{
            client.send(message)
        })
    }
})