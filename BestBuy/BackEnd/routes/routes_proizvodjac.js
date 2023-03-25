const express = require('express')
const router = express.Router()
const Prodavnica = require('../model/prodavnica')
const Proizvod = require('../model/proizvod')
const Tip_proizvod = require('../model/tip_proizvod')

router.post('/post_prodavnica',async(req,res)=>{
    const data = new Prodavnica({
        naziv:req.body.naziv,
        adresa:req.body.adresa,
        telefon:req.body.telefon,
        sajt:req.body.sajt
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

router.get('/getAll_prodavnice',async(req,res)=>{{
    try
    {
        const data = await Prodavnica.find()
        res.json(data)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
}})

router.get('/getOne_prodavnica/:id',async(req,res)=>{
    try
    {
        const data = await Prodavnica.findById(req.params.id)
        res.json(data)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

router.patch('/update_prodavnica/:id',async(req,res)=>{
    try
    {
        const id = req.params.id
        const updatedData=req.body
        const options = {new:true}
        const result = await Prodavnica.findByIdAndUpdate(id,updatedData,options)
        res.send(result)
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
})

//dodati brisanje za proizvod_prodavnicu
router.delete('/delete_prodavnica/:id',async(req,res)=>{
    try
    {
        const id = req.params.id
        const data = await Prodavnica.findByIdAndDelete(id)
        res.send(`Prodavnica sa nazivom: ${data.naziv} je obrisana`)
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
})

module.exports = router_prodavnica