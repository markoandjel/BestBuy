const express = require('express')
const router = express.Router()
const Korisnik = require('../model/korisnik')

router.post('/post_korisnik',async(req,res)=>{
    const data = new Korisnik({
        ime:req.body.ime,
        prezime:req.body.prezime,
        email:req.body.email,
        role:req.body.role,
        username:req.body.username,
        password_hash:req.body.password_hash,
        lista:req.body.lista
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

router.get('/getAll_korisnici',async(req,res)=>{{
    try
    {
        const data = await Korisnik.find()
        res.json(data)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
}})

router.get('/getOne_korisnik/:id',async(req,res)=>{
    try
    {
        const data = await Korisnik.findById(req.params.id)
        res.json(data)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

router.patch('/update_korisnik/:id',async(req,res)=>{
    try
    {
        const id = req.params.id
        const updatedData=req.body
        const options = {new:true}
        const result = await Korisnik.findByIdAndUpdate(id,updatedData,options)
        res.send(result)
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
})

router.delete('/delete_korisnik/:id',async(req,res)=>{
    try
    {
        const id = req.params.id
        const data = await Korisnik.findByIdAndDelete(id)
        res.send(`Korisnik sa username: ${data.username} je obrisan`)
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
})

module.exports = router