const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    lastname:{type:String},
    firstname:{type:String},
    middlename:{type:String},
    contactnumber:{type:String},
    address:{type:String},
    city:{type:String},
    province:{type:String},
    email:{type:String},
    birthdate:{type:String},
    salaryrange:{type:String},
    message:{type:String},
    dates:{type:String},
    status:{type:String},
},{
    timestamps:true,
});

    const Message = mongoose.model('Message', messageSchema);

    module.exports = Message;