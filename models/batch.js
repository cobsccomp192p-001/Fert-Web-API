const mongoose = require('mongoose');

const BatchSchema = mongoose.Schema({
    
    BNO : {
        type : Number,
        // required : true
    },
    startDate : {
        type: Date,
        default:Date.now()

    },
    status: {
        type: Number,
        default: 0
    },
    noOfActiveWindrows: {
        type: Number,
        default: 0
    },
    noOfCompWindrows: {
        type: Number,
        default: 0
    },
    output: {
        type: Number,
        default: 0
    }
    

})


module.exports = mongoose.model('batch',BatchSchema)