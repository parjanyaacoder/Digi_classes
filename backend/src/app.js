console.clear();

console.log('________++++++________')



require('dotenv').config();
const express=require('express');
const app=express();
const router=require('./routers/router.js');
const path=require("path");
require("./db/conn.js");
// const hbs=require("hbs");
const cookieParser=require("cookie-parser");

const port=process.env.PORT || 9000; 

// const public_path=path.join(__dirname,"../public");
// const views_path=path.join(__dirname,"../templates/views");
// const partial_path=path.join(__dirname,"../templates/partials");




// const fs=require('fs');

// const cert_path=path.join(__dirname,"./cert/cert.pem")
// const key_path=path.join(__dirname,"./cert/key.pem")


// const cert=fs.readFileSync(cert_path);
// const key=fs.readFileSync(key_path);


const https=require('http');


const server = https.createServer(app);

const fileupload = require("express-fileupload");








const cors=require("cors");
// const corsOptions ={ origin:'https://classesroom.herokuapp.com', credentials:true, accessControlAllowCredentials:true ,optionSuccessStatus:200}

// console.log(process.env.WHITELIST)
// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:3000/',process.env.WHITELIST]
const corsOptions = {
  origin: function (origin, callback) {
    // console.log("** Origin of request " + origin)
    // console.log(process.env.WHITELIST)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // console.log("Origin acceptable")
      // console.log("i am here 1")
      callback(null, true)
      // console.log("i am here 2")
    } else {
      // console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  },credentials:true
}

app.use(cors(corsOptions))




// app.use(cors(corsOptions)) // Use this after the variable declaration



app.use(fileupload())

// app.use(express.static(public_path));

// hbs.registerPartials(partial_path);
// app.set("view engine","hbs");


// app.set("views",views_path);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

// app.set('trust proxy', 1)




//here comes server.js part


const socket = require("socket.io");
const io = socket(server,{path:"/bar"});


//app.set('socketio',io);

const users = {};

const socketToRoom = {};


io.on('connection', socket => {
    socket.on("join room", roomID => {
        console.log('there is a request')
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4 && false) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
        socket.broadcast.emit('user left',socket.id);
    });

});


//console.log(path.join(__dirname,'../client/build', 'index.html'))

// if (process.env.NODE_ENV === 'production') {



//     // Serve any static files
//     app.use(express.static(path.join(__dirname,'../client/build')));
//   // Handle React routing, return all requests to React app
//     app.get('*', function(req, res) {
//       res.sendFile(path.join(__dirname,'../client/build', 'index.html'));
//      });
//   }
 




server.listen(port,()=>{
    console.log(`Connection successful... Listening to port no ${port}`);
});



