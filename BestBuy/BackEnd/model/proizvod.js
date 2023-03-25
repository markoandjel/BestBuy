const mongoose = require('mongoose')

const dataSchema=new mongoose.Schema({
    naziv:{
        required:true,
        type:String
    },
    opis:{
        type:String
    },
    tip_proizvod:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tip_proizvod',
        required:true
    },
    proizvodjac:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Proizvodjac',
    }

})

module.exports = mongoose.model("Proizvod",dataSchema)