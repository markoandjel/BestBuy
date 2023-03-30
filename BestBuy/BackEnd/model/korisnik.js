const mongoose = require('mongoose')

const dataSchema=new mongoose.Schema({
    username:{
        type:String
    },
    password_hash:{
        type:String
    },
    lista:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Proizvod_Prodavnica',
        required:false
    }]

})

module.exports = mongoose.model("Korisnik",dataSchema)