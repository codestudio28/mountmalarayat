const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingsSchema = new Schema({
    lastname:{type:String},
    firstname:{type:String},
    middlename:{type:String},
    contactnumber:{type:String},
    address:{type:String},
    city:{type:String},
    province:{type:String},
    status:{type:String},
},{
    timestamps:true,
});

    const Listings = mongoose.model('Listings', listingsSchema);

    module.exports = Listings;