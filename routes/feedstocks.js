const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const feedstockModel = require('../models/feedstock');
const verifytoken = require('../tokenVerify')

router.get("/getall",async (req,res)=>{
    try{
        let feedstocks= await feedstockModel.find();
        res.json(feedstocks);
    }catch(ex){
        return res.status(500).send("error"+ex.message);
    }
    
});

router.post('/add',async (req,res) => {

    if(!req.body.Name)
    {
        return res.status(400).send("Name is empty");
    }
    if(!req.body.BNO)
    {
        return res.status(400).send("BNO is empty");
    }
    let lastFeedstock= await feedstockModel.findOne().sort({ field: 'asc', _id: -1 });
    let lastFNO= lastFeedstock.FNO.slice(1);
    let newFNO= parseInt(lastFNO)+1

    let feedstockData = new feedstockModel({
        FNO:"F"+newFNO,
        BNO:req.body.BNO,
        Name:req.body.Name,
        Quantity:req.body.Quantity,
        Supplier:req.body.Supplier,
        Type:req.body.Type
    })

   try{
    feedstockData = await feedstockData.save();
    res.json(feedstockData);

   } catch(err) {

       res.json({message: err});
   }

});

router.get("/:id",async(req,res)=>{
    let reqID=req.params.id
    try{
        let feedstock = await feedstockModel.find({BNO:reqID});
        if(!feedstock){
            return res.status(404).json("no such item")
        }
        console.log(res.json(feedstock))
        res.json(feedstock);
    }
    catch(err){
        return res.status(500).send("error"+err.message);
    } 
    
});

router.put("/:id",async (req,res)=>{
    let reqID=req.params.id
    try{
    let feedstock= await feedstockModel.findByIdAndUpdate(reqID,{
        Name:req.body.Name,
        Quantity:req.body.Quantity,
        Supplier:req.body.Supplier,
        Type:req.body.Type,
    });

    if(!feedstock){
        return res.status(404).send("no such feedstock")
    }
    
    return res.send("Feedstock updated successfully");
    }
    catch(err){
        return res.status(500).send("error"+err.message);
    }
});

router.delete("/:id",async(req,res)=>{
    let reqID=req.params.id
    try{
    let feedstock=await feedstockModel.findByIdAndDelete(reqID);
    if(!feedstock){
        return res.status(404).json("no such item")
    }
    

    res.json(feedstock);
    }
    catch(err){
        return res.status(500).send("error"+err.message);
    }
});

module.exports = router