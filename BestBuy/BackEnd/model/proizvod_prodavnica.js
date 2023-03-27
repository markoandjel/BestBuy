const mongoose = require('mongoose')

const dataSchema=new mongoose.Schema({
    prodavnica:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Prodavnica',
        required:true
    },
    proizvod:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Proizvod',
    },
    na_stanju:{
        required:true,
        type:Boolean
    },
    popust:{
        type:Number
    },
    cena:{
        type:Number
    },

})

module.exports = mongoose.model("Proizvod_Prodavnica",dataSchema)