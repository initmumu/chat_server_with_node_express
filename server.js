const express = require("express")
const http = require("http")
const path = require("path")

const app = express()

const PORT = 8505

const httpServer = http.createServer(app).listen(PORT, () => {
    console.log(`Chatting server is on ${PORT}`)
})

const io = require("socket.io")(httpServer)
console.log(`Socket protocol is ready`)


io.on("connection", (socket) => {
    console.log('connection info : ', socket.request.connection._peername);


    socket.on('new_user', (nick) => {
        socket.nickname = nick
        socket.broadcast.emit('msg', `${socket.nickname}님이 연결 되었습니다`)
    })

    socket.on('msg', (data) => {
        console.log({sender_nick: socket.nickname, sended_msg:data})
        socket.broadcast.emit('msg', `${socket.nickname}: ${data}`)
    })
})