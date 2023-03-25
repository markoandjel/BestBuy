const express = require('express')
const router = express.Router()
const Prodavnica = require('../model/prodavnica')
const Proizvod = require('../model/proizvod')
const Tip_proizvod = require('../model/tip_proizvod')


//#region Prodavnica
router.post('/post_prodavnica',async(req,res)=>{
    const data = new Prodavnica({
        naziv:req.body.naziv,
        adresa:req.body.adresa
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

//#endregion


//#region Proizvod
router.post('/post_proizvod',async(req,res)=>{
    const data = new Proizvod({
        naziv:req.body.naziv,
        tip_proizvod:req.body.tip_proizvod
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

//#endregion


//#region Tip_proizvoda
router.post('/post_tip_proizvod',async(req,res)=>{
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

router.get('/getAll_tip_proizvod',async(req,res)=>{{
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

router.get('/getOne_tip_proizvod/:id',async(req,res)=>{
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

router.patch('/update_tip_proizvod/:id',async(req,res)=>{
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

router.delete('/delete_tip_proizvod/:id',async(req,res)=>{
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

//#endregion


module.exports = router