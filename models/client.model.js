const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
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

    const Client = mongoose.model('Client', clientSchema);

    module.exports = Client;