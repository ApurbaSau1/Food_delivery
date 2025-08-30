import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodroute.js"
import router from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRoute from "./routes/cartRoute.js"
import OrderRouter from "./routes/orderRoute.js"
const app=express()
const port=process.env.PORT || 420
//middleware
app.use(express.json())
app.use(cors())
//Databse connection


connectDB().then(()=>console.log(`Databse Connected ${port}`));

//api endpoints
app.use("/api/food",foodRouter)

app.use("/images", express.static("uploads"))
//user routes
app.use("/api/user", router);

app.use("/api/cart",cartRoute)
app.use("/api/order",OrderRouter)

app.get("/",(req,res)=>{
    res.send(`Server is running on port number ${port}`)
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})
