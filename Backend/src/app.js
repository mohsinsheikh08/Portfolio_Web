const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require('./router/auth.routes.js')
const projectRoutes = require('./router/project.routes.js')
const messageRoutes = require('./router/message.routes.js')
const cors = require("cors");
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes)
app.use('/api/project', projectRoutes)
app.use('/api/message', messageRoutes)
module.exports = app;