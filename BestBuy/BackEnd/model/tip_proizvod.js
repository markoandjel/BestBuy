const mongoose = require('mongoose')

const dataSchema=new mongoose.Schema({
    naziv:{
        required:true,
        type:String
    },
    opis:{
        type:String
    }
})

module.exports = mongoose.model("Tip_proizvod",dataSchema)