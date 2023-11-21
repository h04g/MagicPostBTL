const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
require('dotenv').config();
require('./models').connectDatabase()

const app = express();
const server = http.createServer(app);
const initialRoutes = require('./routes');

app.set('environment', process.env.NODE_ENV)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: [process.env.CLIENT_URL],
  methods: ['POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
  preflightContinue: true
}));

const sessionOption = {
    name: 'sessionId',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 86400 * 1000, // 1 day
        secure: false,
        httpOnly: true,
    }
}
if (app.get('environment') === 'production') {
  // app.set('trust proxy', 1)
  sessionOption.cookie.secure = true
}
app.use(session(sessionOption));

initialRoutes(app);

console.log('NODE_ENV:',app.get('environment'))
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';
server.listen(PORT, HOST, () => {
  console.log('Server is running on:', `${HOST}:${PORT}`);
})