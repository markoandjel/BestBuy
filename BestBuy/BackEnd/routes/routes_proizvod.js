const express = require('express')
const Proizvodjac = require('../model/proizvodjac')
const router_proizvod = express.Router()
const Proizvod = require('../model/proizvod')
const Tip_Proizvod= require('../model/tip_proizvod')


router_proizvod.post('/post_proizvod',async(req,res)=>{
    const data = new Proizvod({
        naziv:req.body.naziv,
        opis:req.body.opis,
        tip_proizvod:req.body.tip_proizvod,
        proizvodjac:req.body.proizvodjac,
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

router_proizvod.get('/getAll_proizvodi',async(req,res)=>{{
    try
    {
        const data = await Proizvod.find()
        res.json(data)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
}})

router_proizvod.get('/getOne_proizvod/:id',async(req,res)=>{
    try
    {
        const data = await Proizvod.findById(req.params.id)
        res.json(data)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

router_proizvod.patch('/update_proizvod/:id',async(req,res)=>{
    try
    {
        const id = req.params.id
        const updatedData=req.body
        const options = {new:true}
        const result = await Proizvod.findByIdAndUpdate(id,updatedData,options)
        res.send(result)
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
})

//dodati brisanje za proizvod_prodavnicu
router_proizvod.delete('/delete_proizvod/:id',async(req,res)=>{
    try
    {
        const id = req.params.id
        const data = await Proizvod.findByIdAndDelete(id)
        res.send(`Prozivod sa nazivom: ${data.naziv} je obrisan`)
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
})

module.exports = router_proizvod;