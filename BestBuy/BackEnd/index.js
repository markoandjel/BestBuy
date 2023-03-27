const express = require("express")
const mongoose = require("mongoose")
const routes_prodavnica=require('./routes/routes_prodavnica')
const routes_proizvodjac=require('./routes/routes_proizvodjac')
const routes_korisnik=require('./routes/routes_korisnik')
const routes_tip_proizvod=require('./routes/routes_tip_proizvod')
const routes_proizvod=require('./routes/routes_proizvod')
const routes_proizvod_prodavnica=require('./routes/routes_proizvod_prodavnica')
require('dotenv').config()
const path = require('path')
const mongoString=process.env.DATABASE_URL

const app=express()

const publicPath= path.join(__dirname, 'FrontEnd/public')
console.log(publicPath);


app.use(express.json())
app.use('/',routes_prodavnica)
app.use('/',routes_proizvodjac)
app.use('/',routes_korisnik)
app.use('/',routes_tip_proizvod)
app.use('/',routes_proizvod)
app.use('/',routes_proizvod_prodavnica)
app.use(express.static(publicPath))


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

