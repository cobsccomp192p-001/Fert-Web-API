const mongoose = require('mongoose');

const FeedstockSchema = mongoose.Schema({
    
    FNO : {
        type : String,
        required : true
    },
    Name: {
        type: String,
        required:true
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