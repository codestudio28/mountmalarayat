const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const voucherSchema = new Schema({
    dates:{type:String},
    payee:{type:String},
    amount:{type:String},
    cv:{type:String},
    bank:{type:String},
    explanation:{type:String},
    cheque:{type:String},
    terms:{type:String},
    prepared:{type:String},
    noted:{type:String},
    approved:{type:String},
    status:{type:String},
},{
    timestamps:true,
});

    const Voucher = mongoose.model('Voucher', voucherSchema);

    module.exports = Voucher;