const exp = require('express')
const path = require('path')

const app = exp();
const http = require('http').createServer(app);
const PORT = process.env.PORT||3000;

http.listen(PORT, () => {
    console.log(`hello world listening on port PORT ${PORT}`)
});
app.use('/public',exp.static(path.join(__dirname+'/public')))


//socket 

const io = require('socket.io')(http);
io.on('connection', socket => {
    console.log('connected ...');
    socket.on('message', (msg) => {
        socket.broadcast.emit('message',msg)
    })
  });
  app.get('/',(req,res) => {
    res.sendFile(__dirname+'/index.html')
})