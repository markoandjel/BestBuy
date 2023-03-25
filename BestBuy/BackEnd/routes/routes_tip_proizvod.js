const express = require('express')
const router_tip_proizvod = express.Router()
const Prodavnica = require('../model/prodavnica')
const Proizvod = require('../model/proizvod')
const Tip_proizvod = require('../model/tip_proizvod')


router_tip_proizvod.post('/post_tip_proizvod',async(req,res)=>{
    const data = new Tip_proizvod({
        naziv:req.body.naziv,
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

router_tip_proizvod.get('/getAll_tip_proizvod',async(req,res)=>{{
    try
    {
        const data = await Tip_proizvod.find()
        res.json(data)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
}})

router_tip_proizvod.get('/getOne_tip_proizvod/:id',async(req,res)=>{
    try
    {
        const data = await Tip_proizvod.findById(req.params.id)
        res.json(data)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

router_tip_proizvod.patch('/update_tip_proizvod/:id',async(req,res)=>{
    try
    {
        const id = req.params.id
        const updatedData=req.body
        const options = {new:true}
        const result = await Tip_proizvod.findByIdAndUpdate(id,updatedData,options)
        res.send(result)
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
})

router_tip_proizvod.delete('/delete_tip_proizvod/:id',async(req,res)=>{
    try
    {
        const id = req.params.id
        const data = await Tip_proizvod.findByIdAndDelete(id)
        res.send(`Tip proizvod sa nazivom: ${data.naziv} je obrisan`)
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
})



module.exports = router_tip_proizvod