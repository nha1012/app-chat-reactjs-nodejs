
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


app.use(
  cors({
    origin: '*', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);

initSocket(io)
// middleware
routerWeb(app);
app.use(express.static(__dirname));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

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

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`API is running on port ${port}`);
});
