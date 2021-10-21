const express = require('express');
const router = express.Router();
const probeModel = require('../models/probe');

router.get("/stat/:id",async(req,res)=>{
    let reqID=req.params.id
    try{
        let probe = await probeModel.find({probeNo:reqID});
        if(!probe){
            return res.status(404).json("no such item")
        }
        res.json(probe);
    }
    catch(err){
        return res.status(500).send("error"+err.message);
    } 
    
});

router.get("/:id",async(req,res)=>{
    let reqID=req.params.id
    try{
        let probe = await probeModel.findOne({probeNo:reqID}).sort({ field: 'asc', _id: -1 });
        if(!probe){
            return res.status(404).json("no such item")
        }
        res.json(probe);
    }
    catch(err){
        return res.status(500).send("error"+err.message);
    } 
    
});



module.exports = router