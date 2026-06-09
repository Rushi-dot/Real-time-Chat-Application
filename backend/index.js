import express from "express"
import dotenv from "dotenv"
import AuthRouter from "./routes/auth.routes.js"
import MessageRouter from "./routes/message.route.js"
import { connectdb } from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app, server } from "./lib/socket.js"
import path from "path"

dotenv.config()


const port = process.env.PORT
const __dirname = path.resolve();
app.use(express.json({limit:"10mb"}))
app.use(cookieParser())
app.use(cors({
  origin:
    process.env.NODE_ENV === "production"
      ? "https://real-time-chat-application-34ck.onrender.com"
      : "http://localhost:5173",
  credentials: true,
}));


app.use('/api/auth',AuthRouter)
app.use('/api/message',MessageRouter)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
})
}

server.listen(port,()=>{
    console.log(`server is running on ${port}`);
    connectdb()
})