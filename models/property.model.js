const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const propertySchema = new Schema({
    block:{ type:String},
    lot:{type:String},
    type:{type:String},
    area:{type:String},
    price:{type:String},
    status:{type:String},
},{
    timestamps:true,
});

    const Property = mongoose.model('Property', propertySchema);

    module.exports = Property;