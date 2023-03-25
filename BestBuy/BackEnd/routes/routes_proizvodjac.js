const express = require('express')
const router = express.Router()
const Proizvodjac = require('../model/proizvodjac')

router.post('/post_proizvodjac',async(req,res)=>{
    const data = new Proizvodjac({
        ime:req.body.ime
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

router.get('/getAll_proizvodjaci',async(req,res)=>{{
    try
    {
        const data = await Proizvodjac.find()
        res.json(data)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
}})

router.get('/getOne_proizvodjac/:id',async(req,res)=>{
    try
    {
        const data = await Proizvodjac.findById(req.params.id)
        res.json(data)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

router.patch('/update_prozvodjac/:id',async(req,res)=>{
    try
    {
        const id = req.params.id
        const updatedData=req.body
        const options = {new:true}
        const result = await Proizvodjac.findByIdAndUpdate(id,updatedData,options)
        res.send(result)
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
})

//dodati brisanje za proizvoda
router.delete('/delete_proizvodjac/:id',async(req,res)=>{
    try
    {
        const id = req.params.id
        const data = await Proizvodjac.findByIdAndDelete(id)
        res.send(`Proizvodjac sa imenom: ${data.ime} je obrisan`)
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
})

module.exports = router