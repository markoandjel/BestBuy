const mongoose = require('mongoose')

const dataSchema=new mongoose.Schema({
    ime:{
        required:true,
        type:String
    }
})

module.exports = mongoose.model("Proizvodjac",dataSchema)