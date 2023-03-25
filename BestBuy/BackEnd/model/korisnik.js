const mongoose = require('mongoose')

const dataSchema=new mongoose.Schema({
    ime:{
        required:true,
        type:String
    },
    prezime:{
        type:String
    },
    email:{
        type:String
    },
    role:{
        type:Number
    },
    username:{
        type:String
    },
    password_hash:{
        type:String
    },
    lista:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Proizvod_Proizvodjac',
        required:true
    }]

})

module.exports = mongoose.model("Korisnik",dataSchema)