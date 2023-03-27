const express = require("express")
const mongoose = require("mongoose")
const routes_prodavnica=require('./routes/routes_prodavnica')
const routes_proizvodjac=require('./routes/routes_proizvodjac')
const routes_korisnik=require('./routes/routes_korisnik')
const routes_tip_proizvod=require('./routes/routes_tip_proizvod')
const routes_proizvod=require('./routes/routes_proizvod')
const routes_proizvod_prodavnica=require('./routes/routes_proizvod_prodavnica')

const cors=require('cors')
require('dotenv').config()
const mongoString=process.env.DATABASE_URL

const app=express()
var http=require('http')

http.createServer(app)
.listen(3000,()=>{
    console.log(`Server Started at ${3000}`)
})

//CORS
var corsOptions = {
    origin: 'http://localhost:5500',
    optionsSuccessStatus: 200, // For legacy browser support
}

app.use(cors(corsOptions));

app.use(express.json())
app.use('/',cors(),routes_prodavnica)
app.use('/',cors(),routes_proizvodjac)
app.use('/',cors(),routes_korisnik)
app.use('/',cors(),routes_tip_proizvod)
app.use('/',cors(),routes_proizvod)
app.use('/',cors(),routes_proizvod_prodavnica)


mongoose.connect(mongoString)
const db=mongoose.connection

db.on('error',(error)=>{
    console.log(error)
})

db.once('connected',()=>{
    console.log('Database connected')
})

