const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    usertype:{ type:String},
    email:{type:String},
    password:{type:String},
    image:{type:String},
    lastname:{type:String},
    firstname:{type:String},
    middlename:{type:String},
    date_created:{type:String},
    status:{type:String},
},{
    timestamps:true,
});

    const Account = mongoose.model('Account', userSchema);

    module.exports = Account;