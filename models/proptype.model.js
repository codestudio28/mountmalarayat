const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const proptypeSchema = new Schema({
    typename:{type:String},
    description:{type:String},
    equity:{type:String},
    misc:{type:String},
    status:{type:String},
},{
    timestamps:true,
});

    const Proptype = mongoose.model('Proptype', proptypeSchema);

    module.exports = Proptype;