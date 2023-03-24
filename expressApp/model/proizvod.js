import { Int32 } from "mongodb";
import mongoose, {Schema} from "mongoose";

////// jedna varijanta

const proizvodSchema = new Schema({

    naziv: {
        type :String,
    },

    opis:
    {
        type: String,
    },

    cena:{
        type: Int32,
    },

    opis2:{
        type: String,
    },
});

export const Proizvod = mongoose.model("Proizvod", proizvodSchema);

///////////// alternativa 
/*
module.exports = function (naziv, opis, cena, opis2) {
    this.naziv=naziv;
    this.opis=opis;
    this.cena=cena;
    this.opis2=opis2;
    this.shortForm = function () { 
        return this.naziv + ' ' + this.cena;
    }
}
*/