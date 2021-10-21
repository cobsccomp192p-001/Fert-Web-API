const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const windrowModel = require('../models/windrow');
const verifytoken = require('../tokenVerify')

router.get("/getall",async (req,res)=>{
    try{
        let windrows= await windrowModel.find();
        res.json(windrows);
    }catch(ex){
        return res.status(500).send("error"+ex.message);
    }
    
});

router.post('/add',async (req,res) => {

    
    if(!req.body.BNO)
    {
        return res.status(400).send("BNO is empty");
    }

    let lastWindrow= await windrowModel.findOne().sort({ field: 'asc', _id: -1 });
    let lastWNO= lastWindrow.WNO.slice(1);
    let newWNO= parseInt(lastWNO)+1

    let windrowkData = new windrowModel({
        WNO:"W"+newWNO,
        BNO:req.body.BNO,
        FLevel1:req.body.FLevel1,
        FLevel2:req.body.FLevel2,
        FLevel3:req.body.FLevel3,
        FLevel4:req.body.FLevel4,
        FLevel5:req.body.FLevel5,
        Start_Date:req.body.Start_Date,
        status:req.body.status,
        probeNo:req.body.probeNo
    })

   try{
    windrowkData = await windrowkData.save();
    res.json(windrowkData);

   } catch(err) {

       res.json({message: err});
   }

});

router.put("/:id",async (req,res)=>{
    let reqID=req.params.id
    try{
    let windrow= await windrowModel.findByIdAndUpdate(reqID,{
        FLevel1:req.body.FLevel1,
        FLevel2:req.body.FLevel2,
        FLevel3:req.body.FLevel3,
        FLevel4:req.body.FLevel4,
        FLevel5:req.body.FLevel5,
        status:req.body.status,
        probeNo:req.body.probeNo,
        turn:req.body.turn
    });

    if(!windrow){
        return res.status(404).send("no such Windrow")
    }
    
    return res.send("Windrow updated successfully");
    }
    catch(err){
        return res.status(500).send("error"+err.message);
    }
});

router.delete("/:id",async(req,res)=>{
    let reqID=req.params.id
    try{
    let windrow=await windrowModel.findByIdAndDelete(reqID);
    if(!windrow){
        return res.status(404).json("no such item")
    }
    

    res.json(windrow);
    }
    catch(err){
        return res.status(500).send("error"+err.message);
    }
});

module.exports = router