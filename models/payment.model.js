const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    clientid:{type:String},
    propertyid:{type:String},
    paymentdate:{type:String},
    amorttype:{type:String},
    amortamount:{type:String},
    amortpenalty:{type:String},
    runningbalance:{type:String},
    payment2:{type:String},
    aror:{type:String},
    paymenttype:{type:String},
    chequenumber:{type:String},
    bankname:{type:String},
    branch:{type:String},
    datepaid:{type:String},
    status:{type:String},
},{
    timestamps:true,
});

    const Payment = mongoose.model('Payment', paymentSchema);

    module.exports = Payment;