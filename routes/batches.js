const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const batchModel = require('../models/batch');
const feedstockModel = require('../models/feedstock');
const windrowModel = require('../models/windrow');
const verifytoken = require('../tokenVerify')
var neededFields = ["status","noOfActiveWindrows","noOfCompWindrows","output","_id","BNO","startDate"]

router.get("/getall",async (req,res)=>{
    try{
        let batches= await batchModel.find()
        var listA = []
        for(const batch of batches){
            var customBatch = {}
            for(const key of neededFields){
                customBatch[key] = batch[key]
            }
            customBatch["items"] = await windrowModel.find({BNO:batch.BNO})
            listA.push(customBatch)
        }
        res.send(listA);
    }catch(ex){
        return res.status(500).send("error"+ex.message);
    }
    
});

// router.get('/last',async(req,res)=>{
//     try{
//         let batch= await batchModel.findOne().sort({ field: 'asc', _id: -1 });
//         res.json(batch);
//     }catch(ex){
//         return res.status(500).send("error"+ex.message);
//     }
// })

router.post('/add',async (req,res) => { 

    
    let lastBatch= await batchModel.findOne().sort({ field: 'asc', _id: -1 });

    let batchData = new batchModel({
        BNO:lastBatch.BNO+1,
        startDate:req.body.startDate,
        status:req.body.status,
    })

   try{
    batchData = await batchData.save();
    res.json(batchData);

   } catch(err) {

       res.json({message: err});
   }

});

router.put("/:id",async (req,res)=>{
    let reqID=req.params.id
    try{
    let batch= await batchModel.findByIdAndUpdate(reqID,{
        status:req.body.status,
        
    });

    if(!batch){
        return res.status(404).send("no such batch")
    }
    
    return res.send("Batch updated successfully");
    }
    catch(err){
        return res.status(500).send("error"+err.message);
    }
});

router.delete("/:id",async(req,res)=>{
    let reqID=req.params.id
    try{
    let batch=await batchModel.findByIdAndDelete(reqID);
    if(!batch){
        return res.status(404).json("no such item")
    }
    

    res.json(batch);
    }
    catch(err){
        return res.status(500).send("error"+err.message);
    }
});

module.exports = router