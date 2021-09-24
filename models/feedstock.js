const mongoose = require('mongoose');

const FeedstockSchema = mongoose.Schema({
    
    FNO : {
        type : String,
        required : true
    },
    BNO : {
        type : Number,
        required : true

    },
    Name: {
        type: String,
        required:true
    },
    Quantity: {
        type: Number,
        default: 0
    },
    Supplier: {
        type: String,
        default:"-"
    },
    Type: {
        type: Number,
        default: 0
    }
    

})


module.exports = mongoose.model('feedstock',FeedstockSchema)