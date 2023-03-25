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
        required:false,//vratiti posle na true
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
    }

})

module.exports = mongoose.model("Prodavnica",dataSchema)