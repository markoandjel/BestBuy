const mongoose = require('mongoose')

const dataSchema=new mongoose.Schema({
    naziv:{
        required:true,
        type:String
    },
    adresa:{
        required:true,
        type:String
    },
    telefon:{
        required:true,//vratiti posle na true
        type: String
    },
    sajt:{
        required:true,
        type:String
    }

})

module.exports = mongoose.model("Prodavnica",dataSchema)