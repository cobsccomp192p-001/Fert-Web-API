const mongoose = require('mongoose');

const windrowSchema = mongoose.Schema({
    
    WNO : {
        type : String,
        required : true
    },
    BNO : {
        type : Number,
        required : true

    },
    FLevel1: {
        type: String,
        default: "-"
    },
    FLevel2: {
        type: String,
        default: "-"
    },
    FLevel3: {
        type: String,
        default: "-"
    },
    FLevel4: {
        type: String,
        default: "-"
    },
    FLevel5: {
        type: String,
        default: "-"
    },
    Start_Date: {
        type: Date,
        default:Date.now()
    },
    status: {
        type: Number,
        default: 0
    },
    probeNo: {
        type:String,
        default:"Unassigned"
    },
    turn: {
        type: Number,
        default: 0
    }
    

})


module.exports = mongoose.model('windrow',windrowSchema)