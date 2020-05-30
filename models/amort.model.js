const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const amortSchema = new Schema({
    clientid:{type:String},
    propertyid:{type:String},
    amortmonths:{type:String},
    financing:{type:String},
    startdate:{type:String},
    reservation:{type:String},
    totalmisc:{type:String},
    totalequity:{type:String},
    monthlymisc:{type:String},
    monthlyequity:{type:String},
    penaltymiscpercent:{type:String},
    penaltyequitypercent:{type:String},
    status:{type:String},
},{
    timestamps:true,
});

    const Amort = mongoose.model('Amort', amortSchema);

    module.exports = Amort;