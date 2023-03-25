const mongoose = require('mongoose')

const dataSchema=new mongoose.Schema({
    korisnik:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Korisnik',
        required:true
    },
    lista:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Proizvod_Proizvodjac',
        required:true
    }]
})

module.exports = mongoose.model("Omiljeni",dataSchema)