import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
import path from 'path'

dotenv.config()
const app = express()
const __dirname = path.resolve();

const port = process.env.PORT || 3000


app.use("/api/auth", authRoute)
app.use("/api/message", messageRoute)

//make ready for deployment
if(process.env.NODE_ENV === "production "){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {

        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}
 
app.listen(port, () => {
    console.log("Server is running on port ", port);
})
