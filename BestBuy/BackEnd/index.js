const express = require("express")
const mongoose = require("mongoose")
const routes=require('./routes/routes')
require('dotenv').config()
const mongoString=process.env.DATABASE_URL

const app=express()

app.use(express.json())
app.use('/api',routes)

app.listen(3000,()=>{
    console.log(`Server Started at ${3000}`)
})

mongoose.connect(mongoString)
const db=mongoose.connection

db.on('error',(error)=>{
    console.log(error)
})

db.once('connected',()=>{
    console.log('Database connected')
})

