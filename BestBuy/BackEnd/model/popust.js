const mongoose = require('mongoose')

const dataSchema=new mongoose.Schema({
    vrednost:{
        required:true,
        type:Number
    }
})

module.exports = mongoose.model("Popust",dataSchema)