
import morgan  from'morgan';
import cors from'cors';
import path from 'path';
import bodyParser from'body-parser';
import mongoose  from'mongoose';
import jsonwebtoken from 'jsonwebtoken';
import routerWeb from './routes/index';
import cookieParser from 'cookie-parser';
import initSocket from './socket.io/index';
import express from 'express';
require('dotenv').config();
var app = require('express')(),
  server  = require("http").createServer(app),
  io = require("socket.io")(server),
  session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  }),
  sharedsession = require("express-socket.io-session");
  app.use(cookieParser());
// Attach session
app.use(session);
 
// Share session with io sockets
 
io.use(sharedsession(session));
 
const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`API is running on port ${port}`);
});
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB CONNECTION ERROR: ', err));

// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if ((process.env.NODE_ENV = 'production')) {
    // app.use(cors({ origin: `http://localhost:3000` }));
    app.use(express.static('client/build'));

    app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}
if ((process.env.NODE_ENV = 'development')) {
  app.use(cors({ origin: `http://localhost:3000`}));
}
initSocket(io)
// middleware
routerWeb(app);
app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });

