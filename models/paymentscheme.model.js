const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentschemeSchema = new Schema({
    paymentname:{type:String},
    percentage:{type:String},
    numyear:{type:String},
    status:{type:String},
},{
    timestamps:true,
});

    const Paymentscheme = mongoose.model('Paymentscheme', paymentschemeSchema);

    module.exports = Paymentscheme;