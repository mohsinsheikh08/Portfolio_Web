const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require('./router/auth.routes.js')
const projectRoutes = require('./router/project.routes.js')
const messageRoutes = require('./router/message.routes.js')
const cors = require("cors");

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://portfolio-hxyu6c1wp-mohsin9.vercel.app/"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes)
app.use('/api/project', projectRoutes)
app.use('/api/message', messageRoutes)
module.exports = app;