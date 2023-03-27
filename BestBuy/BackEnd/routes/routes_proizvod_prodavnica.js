const express = require('express')
//const Proizvodjac = require('../model/proizvodjac')
const router_proizvod_prodavnica = express.Router()
const Proizvod = require('../model/proizvod')
const ProizvodProdavnica = require('../model/proizvod_prodavnica')
const Prodavnica = require('../model/prodavnica')


//const Tip_Proizvod= require('../model/tip_proizvod')


router_proizvod_prodavnica.post('/post_proizvod_prodavnica',async(req,res)=>{
    const data = new ProizvodProdavnica({
        prodavnica:req.body.prodavnica,
        proizvod:req.body.proizvod,
        na_stanju:req.body.na_stanju,
        popust:req.body.popust,
        cena:req.body.cena,
    })
    try{
        const dataToSave=await data.save()
        res.status(200).json(dataToSave)
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
})

router_proizvod_prodavnica.get('/getAll_proizvod_prodavnica',async(req,res)=>{{
    try
    {
        const data = await ProizvodProdavnica.find()
        res.json(data)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
}})

router_proizvod_prodavnica.get('/getOne_proizvod_prodavnica/:id',async(req,res)=>{
    try
    {
        const data = await ProizvodProdavnica.findById(req.params.id)
        res.json(data)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

router_proizvod_prodavnica.patch('/update_proizvod_prodavnica/:id',async(req,res)=>{
    try
    {
        const id = req.params.id
        const updatedData=req.body
        const options = {new:true}
        const result = await ProizvodProdavnica.findByIdAndUpdate(id,updatedData,options)
        res.send(result)
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
})


router_proizvod_prodavnica.delete('/delete_proizvod_prodavnica/:id',async(req,res)=>{
    try
    {
        const id = req.params.id
        const data = await ProizvodProdavnica.findByIdAndDelete(id)
        const data2=await Proizvod.findById(data.proizvod)
        const data3=await Prodavnica.findById(data.prodavnica)
        res.send(`Prozivod iz prodavnice ${data3.naziv}  sa cenom: ${data.cena} i nazivom "${data2.naziv}" je obrisan`)
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
})

module.exports = router_proizvod_prodavnica;