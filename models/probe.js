const mongoose = require('mongoose');

const ProbeSchema = mongoose.Schema({
    
    probeNo : {
        type : String,
        required : true
    },
    temperature: {
        type: Number,
        default:0
    },
    moisture: {
        type: Number,
        default:0
    },
    methane: {
        type: Number,
        default: 0
    },
    humidity: {
        type: Number,
        default: 0
    },
    recDate: {
        type: Date,
        default: Date.now()
    }
    

})


module.exports = mongoose.model('probe',ProbeSchema)