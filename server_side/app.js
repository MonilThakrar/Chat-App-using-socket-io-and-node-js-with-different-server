const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*" } })



server.listen(3000, () => {
    console.log('server start @ 3000');
})

let users = {};

io.on('connection', function(socket) {
    console.log('connected');
    socket.on('new-user-joined', (names) => {
        console.log('new-user-joined', names);
        users[socket.id] = names;
        socket.broadcast.emit('user-joined', names)
            //console.log('join');
    })

    socket.on('send', message => {
        socket.broadcast.emit('received', { user: users[socket.id], message: message })
        console.log('msssaasnjndsnj');
    })

    //socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
    socket.on('disconnect', data => {
        socket.broadcast.emit('leave', users[socket.id])
        delete users[socket.id]
        console.log('user leave');
    })

});