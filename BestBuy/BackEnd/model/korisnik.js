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

})

module.exports = mongoose.model("Korisnik",dataSchema)